import { useState, useCallback } from "react";
import Toast, { TOAST_TYPES } from "../Components/ui/Toast";

const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = TOAST_TYPES.SUCCESS, duration = 5000) => {
      setToast({ message, type });

      if (duration > 0) {
        setTimeout(() => {
          setToast(null);
        }, duration);
      }
    },
    []
  );

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const ToastContainer = useCallback(() => {
    if (!toast) return null;
    return <Toast {...toast} onClose={closeToast} />;
  }, [toast, closeToast]);

  return { showToast, ToastContainer };
};

export { useToast, TOAST_TYPES };
