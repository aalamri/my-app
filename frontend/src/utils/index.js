const TOKEN_KEY = 'jwt';
const USER = 'user';

/*Auth */
export const getToken = (tokenKey = TOKEN_KEY) => {
    if(localStorage && localStorage.getItem(tokenKey)) {
        return JSON.parse(localStorage.getItem(tokenKey));
    }
    return null;
};

export const setToken = (value, tokenKey = TOKEN_KEY) => {
    if(localStorage) {
        localStorage.setItem(tokenKey, JSON.stringify(value));
    }
};

export const setUser = (value, user = USER) => {
    if(localStorage) {
        localStorage.setItem(user, JSON.stringify(value));
    }
};

export const clearToken = (tokenKey = TOKEN_KEY) => {
    if(localStorage) {
        localStorage.removeItem(tokenKey);
    }
};

export const clearUser = (user = USER) => {
    if(localStorage) {
        localStorage.removeItem(user);
    }
}