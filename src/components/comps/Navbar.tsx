import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <motion.nav
      animate={{ y: [-50, 10, 0, 10, 5, 0, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center w-full mt-4 ">
        <div className="flex gap-10 justify-between w-[90vw] max-w-4xl bg-white/10  rounded-xl p-3 shadow-md shadow-white backdrop-blur-md">
          <div className="font-bold text-lg">Logo</div>

          <div className="flex gap-7 text-muted-foreground  bg-white/10  rounded-xl p-3 shadow-md shadow-white backdrop-blur-md">
            <Link to={"/feed"}>
              <Home className="hover:text-primary cursor-pointer" />
            </Link>
            <motion.div
              onClick={toggleSearch}
              whileTap={{ x: [0, -4, 4, -4, 4, 0] }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
            >
              <Search className="hover:text-primary" />
            </motion.div>

            <Link to={"/upload"}>
              <Plus className="hover:text-primary cursor-pointer" />
            </Link>
            <Link to={"/profile"}>
              <User className="hover:text-primary cursor-pointer" />
            </Link>
          </div>

          <div className="text-sm font-semibold">Kuch To</div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center mt-4"
            >
              <input
                type="text"
                disabled
                placeholder="Search is coming soon..."
                className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 shadow-md text-lg font-medium text-gray-500 bg-gray-100 focus:outline-none cursor-not-allowed placeholder:text-gray-400 placeholder:italic"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
