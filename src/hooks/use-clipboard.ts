import React from "react";
import copy from "copy-to-clipboard";

export interface Options {
  timeout?: number;
  format?: string;
}

export function useClipboard(init: string, options: Options = {}) {
  const [value, setValue] = React.useState(init);
  const [hasCopied, setHasCopied] = React.useState(false);

  const { timeout = 1600, format = "text" } = options;

  const onCopy = React.useCallback(() => {
    const didCopy = copy(value, { format });
    setHasCopied(didCopy);
  }, [value, format]);

  React.useEffect(() => {
    let timeoutId: number | null = null;

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return function clear() {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [timeout, hasCopied]);

  return { value, setValue, onCopy, hasCopied };
}
