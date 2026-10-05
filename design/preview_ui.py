"""Capture local visual previews without contacting the learning platform."""

from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / "莞工小蟑螂-优学院全能助手.user.js").read_text(encoding="utf-8")
HTML = '<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0;background:#f5f5f7"><div class="course-container"><div class="page-item" id="page-preview"><div class="page-name active">第1页</div></div></div></body></html>'

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel="chrome", headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 800}, device_scale_factor=1)
    page = context.new_page()
    page.route(
        "https://ua.dgut.edu.cn/learnCourse/learnCourse.html*",
        lambda route: route.fulfill(status=200, content_type="text/html", body=HTML),
    )
    page.goto("https://ua.dgut.edu.cn/learnCourse/learnCourse.html?courseId=preview")
    page.evaluate("window.unsafeWindow=window;window.GM_notification=function(){};window.GM_xmlhttpRequest=function(){return {abort:function(){}}}")
    page.add_script_tag(content=SOURCE)
    panel = page.locator("#xz-panel")
    panel.wait_for()
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-panel-auto.png"))
    page.locator("#xz-btn-auto").hover()
    page.wait_for_timeout(180)
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-hover-auto-light.png"))
    page.mouse.move(2, 2)
    page.locator('#xz-advanced').evaluate("element => element.open = true")
    page.locator('#xz-locate-pending').scroll_into_view_if_needed()
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-page-locator.png"))
    page.locator('#xz-advanced').evaluate("element => element.open = false")
    page.locator('.xz-capsule-nav [data-goto="export"]').click()
    page.wait_for_timeout(220)
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-panel-export.png"))
    page.locator('.xz-capsule-nav [data-goto="reading"]').click()
    page.wait_for_timeout(220)
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-panel-reading.png"))
    page.locator('.xz-header-about').click()
    page.locator("#xz-dark-toggle").check()
    page.locator('#xz-sec-about [data-goto="previous"]').click()
    page.locator('.xz-capsule-nav [data-goto="auto"]').click()
    page.wait_for_timeout(220)
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-panel-dark.png"))
    page.locator("#xz-btn-auto").hover()
    page.wait_for_timeout(180)
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-hover-auto-dark.png"))
    page.mouse.move(2, 2)
    page.locator('.xz-header-about').click()
    for _ in range(7):
        page.locator('#xz-easter-trigger').click()
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-easter-dark.png"))
    page.locator('#xz-easter-close').click()
    page.locator('#xz-sec-about [data-goto="previous"]').click()
    page.locator('.xz-header-about').click()
    page.locator("#xz-dark-toggle").uncheck()
    page.locator('#xz-sec-about [data-goto="previous"]').click()
    page.set_viewport_size({"width": 390, "height": 844})
    page.locator('.xz-capsule-nav [data-goto="auto"]').click()
    panel.screenshot(path=str(ROOT / "screenshots" / "v4.4.11-panel-mobile.png"))
    page.set_viewport_size({"width": 1280, "height": 800})
    logo_uri = page.locator("#xz-panel .logo").get_attribute("src")
    selector_css = (ROOT / "design" / "selector.css").read_text(encoding="utf-8")
    page.add_style_tag(content=selector_css.replace("${LOGO_URI}", logo_uri))
    page.evaluate("""() => document.body.insertAdjacentHTML('beforeend', `
      <div id="xz-sel-overlay"><div id="xz-sel-box">
        <div id="xz-sel-head"><div class="ico"></div><div class="txt"><h3>课程章节</h3><small>选择要导出的章节</small></div></div>
        <div id="xz-sel-actions"><button>全选</button><button>全不选</button></div>
        <div id="xz-sel-list"><label class="xz-ch-item"><input type="checkbox" checked><span class="ch-name">第一章 · 基础知识</span><span class="ch-count">4 个练习</span></label><label class="xz-ch-item"><input type="checkbox" checked><span class="ch-name">第二章 · 课程实践</span><span class="ch-count">6 个练习</span></label></div>
        <div id="xz-sel-foot"><span class="info">已选 2 / 2 章</span><div class="btns"><button class="btn-cancel">取消</button><button class="btn-ok">导出所选章节</button></div></div>
      </div></div>`)
    """)
    page.locator("#xz-sel-box").screenshot(path=str(ROOT / "screenshots" / "v4.4.11-selector.png"))
    page.locator("#xz-sel-overlay").evaluate("element => element.classList.add('xz-sel-dark')")
    page.locator("#xz-sel-box").screenshot(path=str(ROOT / "screenshots" / "v4.4.11-selector-dark.png"))
    browser.close()
