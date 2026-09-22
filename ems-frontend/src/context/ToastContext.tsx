"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Toast } from "@/components/toast";
import { ToastType } from "@/components/toast";

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message: string;
}

interface ToastContextProps {
  setToast: (data: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextProps>({
  setToast: () => {}
});

const MAX_TOASTS = 5;
const AUTO_HIDE_MS = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  };

  const setToast = ({ type, title, message }: Omit<ToastData, "id">) => {
    const id = crypto.randomUUID();

    setToasts(prev => {
      const updated = [...prev, { id, type, title, message }];
      if (updated.length > MAX_TOASTS) updated.shift(); // drop oldest
      return updated;
    });

    timers.current[id] = setTimeout(() => removeToast(id), AUTO_HIDE_MS);
  };

  const handleHover = (id: string, pause: boolean) => {
    if (pause) {
      clearTimeout(timers.current[id]);
    } else {
      timers.current[id] = setTimeout(() => removeToast(id), 1500);
    }
  };

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}

      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map(t => (
            <div
              key={t.id}
              onMouseEnter={() => handleHover(t.id, true)}
              onMouseLeave={() => handleHover(t.id, false)}
            >
              <Toast
                type={t.type}
                title={t.title}
                message={t.message}
                onClose={() => removeToast(t.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
