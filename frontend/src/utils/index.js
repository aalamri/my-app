import strings from "../translations/messages.json";
const TOKEN_KEY = "jwt";
const USER = "user";
const LOCALSTORAGE_KEY = "__modrek_initial_state__";
const AR = "Arabic";
const EN = "English";

/*Auth */
export const getToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
};

export const setToken = (value, tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
};

export const setUser = (value, user = USER) => {
  if (localStorage) {
    localStorage.setItem(user, JSON.stringify(value));
  }
};

export const clearToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.removeItem(tokenKey);
  }
};

export const clearUser = (user = USER) => {
  if (localStorage) {
    localStorage.removeItem(user);
  }
};

export const scrollToTop = (distance = 0) => {
  window.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

export const shuffleArray = (array) => {
  const result = [],
    source = array.concat([]);
  while (source.length) {
    let index = Math.floor(Math.random() * source.length);
    result.push(source[index]);
    source.splice(index, 1);
  }
  return result;
};

/**
 * Check if localStorage is supported.
 * @function
 * @param {string} type - The text we want to capitalize.
 * @return {string} The Capitalized text.
 */
export function localStorageAvailable() {
  try {
    var storage = window["localStorage"],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

// Get default state values
export function getDefaultState() {
  const state = {
    localStorageIsAvailable: true,
    siteLanguage: "Arabic",
  };
  if (localStorageAvailable()) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
  }
  return state;
}

export function getState() {
  if (localStorageAvailable()) {
    const state = localStorage.getItem(LOCALSTORAGE_KEY);
    return state ? JSON.parse(state) : getDefaultState();
  }
}

export function getString(id) {
  const { siteLanguage = AR } = getState();
  const lang = siteLanguage === AR ? "ar" : "en";
  return strings[id][lang];
}
export async function switchLanguage() {
  return new Promise((res) => {
    const { siteLanguage } = getState();
    const lang = siteLanguage === AR ? EN : AR;
    const state = localStorage.getItem(LOCALSTORAGE_KEY);
    const newState = { ...JSON.parse(state), siteLanguage: lang };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newState));
    res();
  });
}
