const KEY_THEME = "THEME";
const THEMES = {
  dark: "dark",
  light: "light",
};

function ThemeProvider() {
  this.getTheme = () => localStorage.getItem(KEY_THEME);
  this.setTheme = (value) => localStorage.setItem(KEY_THEME, value);
}

ThemeProvider.prototype.assignThemeToDocument = function (value) {
  this.setTheme(value);
  document.documentElement.dataset.theme = value;
};

ThemeProvider.prototype.getDeviceThemeMedia = () => {
  let isDarkTheme = window.matchMedia("(prefers-color-scheme:dark)").matches;
  return isDarkTheme ? THEMES.dark : THEMES.light;
};

ThemeProvider.prototype.toggleTheme = function () {
  switch (this.getTheme()) {
    case THEMES.dark:
      this.setTheme(THEMES.light);
      break;
    case THEMES.light:
      this.setTheme(THEMES.dark);
      break;
  }
  this.assignThemeToDocument(this.getTheme());
};

ThemeProvider.prototype.setDefaultTheme = function (callback) {
  let theme = this.getDeviceThemeMedia();
  if (this.getTheme()) {
    this.assignThemeToDocument(this.getTheme());
  } else {
    this.assignThemeToDocument(theme);
  }
  if(callback !== undefined) callback(this.getTheme());
};
