"""Embed the readable UI CSS files into the standalone userscript."""

from pathlib import Path
import base64
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "莞工小蟑螂-优学院全能助手.user.js"


def embed_block(source: str, anchor: str, css_path: Path) -> str:
    begin = source.index("'<style>',", source.index(anchor))
    end = source.index("'</style>',", begin) + len("'</style>',")
    css = css_path.read_text(encoding="utf-8").strip()
    if "`" in css:
        raise ValueError(f"Template literal delimiter found in {css_path}")
    if "${" in css and css_path.name != "selector.css":
        raise ValueError(f"Unexpected template interpolation in {css_path}")
    replacement = "'<style>',\n      String.raw`" + css + "`,\n      '</style>',"
    return source[:begin] + replacement + source[end:]


script = SOURCE.read_text(encoding="utf-8")
script = embed_block(script, "function showCoursewareSelector", ROOT / "design" / "selector.css")
script = embed_block(script, "function createUI", ROOT / "design" / "sidebar.css")
icon = next((candidate for candidate in (
    ROOT / "assets" / "mascot-v4.2.png",
    ROOT / "assets" / "mascot-v4.2.svg",
) if candidate.exists()), None)
if icon:
    media_type = "image/png" if icon.suffix == ".png" else "image/svg+xml"
    encoded = base64.b64encode(icon.read_bytes()).decode("ascii")
    icon_uri = "data:" + media_type + ";base64," + encoded
    script, count = re.subn(
        r"var LOGO_URI = 'data:image/(?:png|svg\+xml);base64,[^']*';",
        "var LOGO_URI = '" + icon_uri + "';",
        script,
        count=1,
    )
    if count != 1:
        raise ValueError("Could not find embedded logo declaration")
    metadata_asset = ROOT / "assets" / "mascot-v4.2.svg"
    if metadata_asset.exists():
        metadata_uri = "data:image/svg+xml;base64," + base64.b64encode(metadata_asset.read_bytes()).decode("ascii")
    else:
        metadata_uri = icon_uri
    script, count = re.subn(
        r"^// @icon\s+.*$",
        "// @icon         " + metadata_uri,
        script,
        count=1,
        flags=re.MULTILINE,
    )
    if count != 1:
        raise ValueError("Could not find metadata icon declaration")
SOURCE.write_text(script, encoding="utf-8")
