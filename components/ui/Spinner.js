import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Spinner = ({ size, className }) => {
  const [currentTheme, setCurrentTheme] = useState(null);
  const themeState = useSelector((state) => state.theme);

  let style;
  const { theme } = themeState;

  switch (size) {
    case "sm": {
      style = { width: "16px", height: "16px" };
      break;
    }

    case "lg": {
      style = { width: "32px", height: "32px" };
      break;
    }

    case "xl": {
      style = { width: "48px", height: "48px" };
      break;
    }

    default: {
      style = { width: "24px", height: "24px" };
      break;
    }
  }

  useEffect(
    function () {
      setCurrentTheme(theme);
    },
    [theme]
  );

  return (
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ ease: "easeOut", duration: 0.5, repeat: Infinity }}
      className={`spinner border-t-2 border-t-primary border-2 ${
        currentTheme === "dark" ? "border-muted-dark" : "border-muted"
      } rounded-full ${className}`}
      style={style}
    />
  );
};

export default Spinner;
