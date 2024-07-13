import { useEffect } from "react";

export function useKey(keyCode: string, callback: () => void) {
    useEffect(() => {
        const keydownCallback = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === keyCode.toLowerCase()) {
              callback();
            }
        }

        document.addEventListener('keydown', keydownCallback);

        return () => {
            document.removeEventListener('keydown', keydownCallback);
        }
      }, [keyCode, callback]);
}