import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./ui/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ToastPlayStore from "./ui/toasts/ToastPlayStore";

config.autoAddCss = false;

const Layout = ({ children }) => {
  const themeState = useSelector((state) => state.theme);
  const [playStoreToast, setPlayStoreToast] = useState(false);

  const { theme } = themeState;

  const handleOpenPlayStoreToast = () => setPlayStoreToast(true);
  const handleClosePlayStoreToast = () => setPlayStoreToast(false);

  useEffect(function () {
    const identifier = setTimeout(function () {
      handleOpenPlayStoreToast();
    }, 5000);

    return () => clearTimeout(identifier);
  }, []);

  useEffect(
    function () {
      if (typeof window !== "undefined") localStorage.setItem("theme", theme);

      const [html, body] = [
        document.querySelector("html"),
        document.querySelector("body"),
      ];

      if (theme === "light") {
        html.classList.remove("dark");
        body.className = "bg-white text-dark transition-all";
      }

      if (theme === "dark") {
        html.classList.add("dark");
        body.className = "bg-black text-white transition-all";
      }
    },
    [theme]
  );

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ToastPlayStore
        show={playStoreToast}
        handleClosePlayStoreToast={handleClosePlayStoreToast}
      />
    </>
  );
};

export default Layout;
