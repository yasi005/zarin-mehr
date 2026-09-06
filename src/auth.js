import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';
const LAST_RESULT_KEY = 'lastResult';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function setSession({ token, userId } = {}) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  if (userId != null) {
    localStorage.setItem(USER_ID_KEY, String(userId));
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function clearSession() {
  clearAuth();
  localStorage.removeItem(LAST_RESULT_KEY);
}

export function isTokenValid(token = getToken()) {
  if (!token) {
    return false;
  }

  try {
    const payload = jwtDecode(token);
    if (payload?.exp && payload.exp * 1000 <= Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function isAuthenticated() {
  return isTokenValid();
}

export function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
