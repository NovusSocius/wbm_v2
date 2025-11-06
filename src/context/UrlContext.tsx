import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type UrlContextValue = {
  url: string;
  setUrl: (v: string) => void;
  clearUrl: () => void;
};

const UrlContext = createContext<UrlContextValue | undefined>(undefined);

const STORAGE_KEY = "wbm:lastUrl";
const PARAM_KEY = "url";

function getInitialUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get(PARAM_KEY);
  if (fromQuery && fromQuery.trim()) return fromQuery.trim();

  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (fromStorage) return fromStorage;
  } catch {
    /* ignore storage errors */
  }

  return "";
}

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [url, setUrlState] = useState<string>(() => getInitialUrl());

  const setUrl = (v: string) => {
    const next = v.trim();
    setUrlState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage errors */
    }

    if (typeof window !== "undefined") {
      const u = new URL(window.location.href);
      if (next) {
        u.searchParams.set(PARAM_KEY, next);
      } else {
        u.searchParams.delete(PARAM_KEY);
      }
      window.history.replaceState({}, "", u.toString());
    }
  };

  const clearUrl = () => setUrl("");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, url);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const value = useMemo(
    () => ({
      url,
      setUrl,
      clearUrl,
    }),
    [url]
  );

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export function useUrlState() {
  const ctx = useContext(UrlContext);
  if (!ctx) throw new Error("useUrlState must be used within <UrlProvider>");
  return ctx;
}
