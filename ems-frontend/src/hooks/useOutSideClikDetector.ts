import { useEffect } from "react";

type OutsideClickHandler = (event: MouseEvent) => void;

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onOutsideClick: OutsideClickHandler,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onOutsideClick, enabled]);
}
