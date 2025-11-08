import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);

  const shortcuts: Shortcut[] = [
    {
      key: "d",
      ctrl: true,
      description: "Go to Dashboard",
      action: () => navigate("/"),
    },
    {
      key: "c",
      ctrl: true,
      description: "Go to Calendar",
      action: () => navigate("/calendar"),
    },
    {
      key: "a",
      ctrl: true,
      description: "Go to Assignments",
      action: () => navigate("/assignments"),
    },
    {
      key: "m",
      ctrl: true,
      description: "Go to Messages",
      action: () => navigate("/messages"),
    },
    {
      key: "/",
      ctrl: true,
      description: "Focus Search",
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      },
    },
    {
      key: "k",
      ctrl: true,
      description: "Toggle Shortcuts Overlay",
      action: () => setShowOverlay((prev) => !prev),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === event.key.toLowerCase() &&
          s.ctrl === event.ctrlKey &&
          !s.alt === !event.altKey &&
          !s.shift === !event.shiftKey
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { shortcuts, showOverlay, setShowOverlay };
}
