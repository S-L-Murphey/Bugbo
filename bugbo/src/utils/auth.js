import { apiURL } from "./api";

export const authFetch = (url, options) => {
  const token = `Token ${userToken()}`;
  const newOptions = { ...options };
  if ("headers" in newOptions) {
    newOptions.headers.Authorization = token;
  } else {
    newOptions.headers = { Authorization: token };
  }
  return fetch(url, newOptions);
};

export const logout = () => {
  clearUser();
};

export const login = (username, password) =>
  fetch(apiURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        setUser(res.token);
        return true;
      } else if (res.id) {
        // TODO remove this once it's not needed
        // handle unupdated backend auth code
        setUser(res.id);
        return true;
      } else {
        return false;
      }
    });

export const register = (user) => {
  return fetch(apiURL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        setUser(res.token);
        return true;
      } else {
        return false;
      }
    });
};

// TODO update this to "rare_user_token"
const tokenKey = "bugbo_user_id";

const setUser = (token) => {
  localStorage.setItem(tokenKey, token);
};

const clearUser = () => {
  localStorage.removeItem(tokenKey);
};

export const userToken = () => localStorage.getItem(tokenKey);
