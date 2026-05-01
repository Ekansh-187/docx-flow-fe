"use client";

import { useCallback, useSyncExternalStore } from "react";

const AUTH_CHANGE_EVENT = "auth-change";

function getSnapshot(): boolean {
  return !!localStorage.getItem("access_token");
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

export function loginWithTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  notifyAuthChange();
}

export function storeApiKey(apiKey: string) {
  localStorage.setItem("api_key", apiKey);
  notifyAuthChange();
}

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("api_key");
}

export function logoutAndClear() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("api_key");
  notifyAuthChange();
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const logout = useCallback(() => {
    logoutAndClear();
  }, []);

  return { isAuthenticated, logout };
}
