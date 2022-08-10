function loadFontSettingsFromLocalStorage(){
    const style = getComputedStyle(document.querySelector(":root"));
    const storage = window.localStorage;
    style.setProperty("--custom-line-height",storage.getItem("lineHeight"));
    style.setProperty("--custom-font-weight",storage.getItem("fontWeight"));
    style.setProperty("--custom-font-factor",storage.getItem("fontSizeFactor"));
    console.log("styles loaded");
}
export default loadFontSettingsFromLocalStorage;