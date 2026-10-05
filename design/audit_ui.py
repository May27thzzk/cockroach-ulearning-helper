"""Audit the embedded panel in a local fake course page (no platform requests)."""

from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = (ROOT / "莞工小蟑螂-优学院全能助手.user.js").read_text(encoding="utf-8")
HTML = '<!doctype html><html><head><meta charset="utf-8"></head><body><div class="course-container"><div class="page-item"><div class="page-name active">第1页</div></div></div></body></html>'


def inspect(page, width):
    return page.evaluate(
        """(width) => {
          const panel = document.querySelector('#xz-panel');
          const body = panel.querySelector('.xz-body');
          const view = panel.querySelector('.sec.show');
          const panelRect = panel.getBoundingClientRect();
          const unlabeledInputs = [...panel.querySelectorAll('input')]
            .filter(el => !el.labels?.length && !el.getAttribute('aria-label'))
            .map(el => el.id);
          const unnamedButtons = [...panel.querySelectorAll('button')]
            .filter(el => !el.textContent.trim() && !el.getAttribute('aria-label'))
            .map(el => el.id || el.className);
          const overflowing = [body, view, ...view.querySelectorAll('.xz-card')]
            .filter(el => getComputedStyle(el).overflowX !== 'hidden' && el.scrollWidth > el.clientWidth + 2)
            .map(el => el.id || el.className);
          const escapedControls = [...view.querySelectorAll('button,input,summary')]
            .filter(el => {
              const r = el.getBoundingClientRect();
              return r.width && (r.left < panelRect.left - 2 || r.right > panelRect.right + 2);
            }).map(el => el.id || el.className);
          const navSelected = [...panel.querySelectorAll('.xz-capsule-nav button')]
            .filter(el => el.getAttribute('aria-pressed') === 'true').map(el => el.dataset.goto);
          const dock = panel.dataset.view === 'reading'
            ? panel.querySelector('#xz-reading-dock')
            : panel.dataset.view === 'auto' ? panel.querySelector('#xz-auto-dock') : null;
          return {width, view: panel.dataset.view, panelWidth: panelRect.width,
            panelInsideViewport: panelRect.left >= -1 && panelRect.right <= width + 1,
            dockVisible: !dock || getComputedStyle(dock).display !== 'none',
            unlabeledInputs, unnamedButtons, overflowing, escapedControls, navSelected};
        }""",
        width,
    )


def inspect_hover_feedback(page):
    def state(locator):
        return locator.evaluate("""el => {
      const s=getComputedStyle(el),r=el.getBoundingClientRect();
      return {background:s.backgroundColor,border:s.borderColor,transform:s.transform,shadow:s.boxShadow,top:r.top,
        transitionSeconds:parseFloat(s.transitionDuration.split(',')[0])||0,cursor:s.cursor};
    }""")

    def hover_change(locator):
        before = state(locator)
        locator.hover()
        page.wait_for_timeout(190)
        after = state(locator)
        changed = any(before[key] != after[key] for key in ("background", "border", "transform", "shadow", "top"))
        return {"changed": changed, "transitionSeconds": after["transitionSeconds"], "cursor": after["cursor"]}

    feedback = {}
    nav = page.locator("#xz-panel .xz-capsule-nav button:not(.active):visible").first
    feedback["navigation"] = hover_change(nav)
    action_selector = {"auto": "#xz-btn-auto", "export": "#xz-btn-export", "reading": "#xz-btn-reading"}[page.locator("#xz-panel").get_attribute("data-view")]
    action = page.locator(f"#xz-panel {action_selector}:visible").first
    feedback["primaryAction"] = hover_change(action)
    toggle = page.locator("#xz-panel .xz-toggle-group label.xz-lbl:visible").first
    if toggle.count():
        feedback["toggle"] = hover_change(toggle)
    page.mouse.move(2, 2)
    return feedback


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel="chrome", headless=True)
    failures = []
    for width, height in [(1280, 800), (390, 844), (320, 700)]:
        context = browser.new_context(viewport={"width": width, "height": height})
        page = context.new_page()
        page_errors = []
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.route("https://ua.dgut.edu.cn/learnCourse/learnCourse.html*", lambda route: route.fulfill(status=200, content_type="text/html", body=HTML))
        page.goto("https://ua.dgut.edu.cn/learnCourse/learnCourse.html?courseId=visual-audit")
        page.evaluate("window.unsafeWindow=window;window.GM_notification=function(){};window.GM_xmlhttpRequest=function(){return {abort:function(){}}}")
        page.add_script_tag(content=SCRIPT)
        for theme in ("light", "dark"):
            if theme == "dark":
                page.locator(".xz-header-about").click()
                page.locator("#xz-dark-toggle").check()
                page.locator('#xz-sec-about [data-goto="previous"]').click()
            for view in ("auto", "export", "reading"):
                page.locator(f'.xz-capsule-nav [data-goto="{view}"]').click()
                item = inspect(page, width)
                hover_feedback = inspect_hover_feedback(page)
                valid = (
                    item["panelInsideViewport"] and item["dockVisible"]
                    and not item["unlabeledInputs"] and not item["unnamedButtons"]
                    and not item["overflowing"] and not item["escapedControls"]
                    and item["navSelected"] == [view]
                    and all(item["changed"] and item["transitionSeconds"] > 0 and item["cursor"] == "default" for item in hover_feedback.values())
                    and page.locator("#xz-panel").evaluate("element => element.classList.contains('xz-dark')") == (theme == "dark")
                )
                print(f"{width}px {theme} {view}: {'PASS' if valid else 'FAIL'} hover={hover_feedback} {item}")
                if not valid:
                    failures.append(item)
            page.emulate_media(reduced_motion="reduce")
            reduced_seconds = page.locator("#xz-panel .xz-toggle-group label.xz-lbl").first.evaluate("el => parseFloat(getComputedStyle(el).transitionDuration.split(',')[0])||0")
            if reduced_seconds > 0.0001:
                failures.append({"width": width, "theme": theme, "reducedMotionSeconds": reduced_seconds})
                print(f"{width}px {theme} reduced-motion: FAIL {reduced_seconds}s")
            else:
                print(f"{width}px {theme} reduced-motion: PASS {reduced_seconds}s")
            page.emulate_media(reduced_motion="no-preference")
        failures.extend(page_errors)
        context.close()
    browser.close()
    if failures:
        raise SystemExit(f"Visual audit failed: {failures}")
