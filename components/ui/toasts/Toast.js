import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Toast = ({ show, className, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState("none");

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!show) setDisplay("none");
      }, 100);

      if (show) setDisplay("block");

      return () => clearTimeout(identifier);
    },

    [show]
  );

  useEffect(function () {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <motion.section
      initial={{ scale: 1.1 }}
      animate={{ scale: show ? [0.9, 1] : [1, 0.9] }}
      style={{ display }}
      className={`toast absolute bottom-6 lg:bottom-4 right-1/2 !translate-x-1/2 lg:!translate-x-0 lg:right-4 w-11/12 lg:w-[25%] bg-white dark:bg-black rounded-lg border dark:border-dark shadow p-3 z-50 ${className}`}
    >
      {children}
    </motion.section>,
    document.getElementById("toast-backdrop")
  );
};

const ToastHeader = ({ className, children }) => (
  <section className={`toast-header ${className}`}>{children}</section>
);

const ToastBody = ({ className, children }) => (
  <section className={`toast-body ${className}`}>{children}</section>
);

const ToastFooter = ({ className, children }) => (
  <section className="toast-footer">{children}</section>
);

Toast.Header = ToastHeader;
Toast.Body = ToastBody;
Toast.Footer = ToastFooter;

export default Toast;
