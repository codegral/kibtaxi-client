import { motion } from "framer-motion";
import { v4 } from "uuid";

const TaxisLoading = ({ count = 10 }) => {
  const loading_elements = [];

  for (let i = 0; i < count; i++)
    loading_elements.push(
      <li
        className="grid grid-cols-12 rounded bg-light dark:bg-dark p-4"
        key={v4()}
      >
        <motion.div className="col-span-3">
          <div className="relative w-[48px] h-[48px] bg-muted dark:bg-black rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-150, 150] }}
              transition={{
                ease: "easeInOut",
                duration: 1.25,
                repeat: Infinity,
              }}
              className="absolute rounded-full"
              style={{
                boxShadow: "0 0 48px 48px rgba(var(--color-muted-dark))",
              }}
            />
          </div>
        </motion.div>
        <motion.div className="col-span-9">
          <div className="relative w-2/3 h-[12px] bg-muted dark:bg-black rounded-full overflow-hidden mb-3">
            <motion.div
              animate={{ x: [-400, 400] }}
              transition={{
                ease: "easeInOut",
                duration: 1.25,
                repeat: Infinity,
              }}
              className="absolute rounded-full"
              style={{
                boxShadow: "0 0 48px 48px rgba(var(--color-muted-dark))",
              }}
            />
          </div>
          <div className="relative w-1/3 h-[12px] bg-muted dark:bg-black rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-400, 400] }}
              transition={{
                ease: "easeInOut",
                duration: 1.25,
                repeat: Infinity,
              }}
              className="absolute rounded-full"
              style={{
                boxShadow: "0 0 48px 48px rgba(var(--color-muted-dark))",
              }}
            />
          </div>
        </motion.div>
      </li>
    );

  return (
    <ul className="w-full space-y-6">
      {loading_elements.map((loading_element) => loading_element)}
    </ul>
  );
};

export default TaxisLoading;
