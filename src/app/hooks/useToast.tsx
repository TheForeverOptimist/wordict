import { useCallback, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type: "info" | "success" | "error";
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: "info" | "success" | "error" = "info") => {
      setToasts((currentToasts) => [
        ...currentToasts,
        { id: Date.now(), message, type },
      ]);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return { toasts, addToast, removeToast };
};
