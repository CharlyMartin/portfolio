"use client";

import React from "react";

import Icons from "@/components/atoms/icons";

export default function ThemeToggle() {
  const isDark = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // React resets <html> attributes on the dev Strict Mode remount; re-apply. No-op in production.
  React.useLayoutEffect(applyStoredTheme, []);

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={isDark}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <Icons.Sun className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <Icons.Moon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400" />
    </button>
  );
}

function toggleMode() {
  disableTransitionsTemporarily();

  const isSystemDarkMode = isSystemDark();
  const isDarkMode = document.documentElement.classList.toggle("dark");

  if (isDarkMode === isSystemDarkMode) {
    delete window.localStorage.isDarkMode;
  } else {
    window.localStorage.isDarkMode = isDarkMode;
  }
}

function disableTransitionsTemporarily() {
  document.documentElement.classList.add("[&_*]:transition-none!");
  window.setTimeout(() => {
    document.documentElement.classList.remove("[&_*]:transition-none!");
  }, 0);
}

function isSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyStoredTheme() {
  const stored = window.localStorage.isDarkMode;
  const isDark = stored === undefined ? isSystemDark() : stored === "true";
  document.documentElement.classList.toggle("dark", isDark);
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return undefined;
}
