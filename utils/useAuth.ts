"use client";

import { useCallback, useSyncExternalStore } from "react";

const AUTH_CHANGE_EVENT = "auth-change";

function getSnapshot(): boolean {
  return !!localStorage.getItem("access_token");
}

function getUserNameSnapshot(): string {
  return localStorage.getItem("user_name") || "";
}

function getServerUserNameSnapshot(): string {
  return "";
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(AUTH_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function loginWithTokens(accessToken: string, refreshToken: string, userName?: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  if (userName) {
    localStorage.setItem("user_name", userName);
  }
  notifyAuthChange();
}


export function logoutAndClear() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_name");
  notifyAuthChange();
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const userName = useSyncExternalStore(subscribe, getUserNameSnapshot, getServerUserNameSnapshot);

  const logout = useCallback(() => {
    logoutAndClear();
  }, []);

  return { isAuthenticated, logout, userName };
}
