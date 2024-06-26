import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Board from "./Board";

function Sidebar({ onHide, isHidden, boards }) {
  const [toggle, setToggle] = useState(localStorage.getItem("toggle") || true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("toggle", toggle);
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme, toggle]);

  const handleToggle = () => {
    setToggle((toggle) => !toggle);
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <aside
      className={`flex h-[85vh] flex-col justify-between border-r-2 border-r-border-color bg-bkg-color p-6 transition-all duration-300 dark:border-r-dark-border-color dark:bg-dark-bg-color ${isHidden ? `translate-x-[-320px]` : ``}`}
    >
      <div>
        <span className="inline-block text-[12px] font-bold  uppercase tracking-[3px] text-sidebar-font-color">
          all boards ({boards.length})
        </span>

        <ul className="mt-7 flex flex-col gap-y-6 text-sm font-bold">
          <Board pathname="/platformLaunch">Platform Launch</Board>

          <Board pathname="/marketingPlan">Marketing Plan</Board>

          <Board pathname="/roadmap">Roadmap</Board>

          <Board pathname="/newBoard">+ Create New Board</Board>
        </ul>
      </div>

      <div>
        <div className="rounded-md bg-app-bg-color p-3 transition-all duration-300 dark:bg-dark-border-color">
          <div className="flex items-center justify-center gap-x-4">
            <span className="text-xl text-sidebar-font-color">
              <IoSunny />
            </span>

            <label className="inline-flex cursor-pointer items-center">
              <input
                id="sidebar-checkbox"
                type="checkbox"
                className="peer sr-only"
                checked={JSON.parse(toggle)}
                onChange={handleToggle}
              />
              <div className="after:border-gray-300 peer relative h-6 w-11 rounded-full bg-light-toggle-color after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-color peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
            </label>

            <span className="text-sidebar-font-color">
              <BsFillMoonStarsFill />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-sidebar-font-color">
          <FaRegEyeSlash className="h-4 w-4" />
          <span
            className="inline-block cursor-pointer transition-all duration-300 hover:text-purple-color"
            onClick={onHide}
          >
            Hide Sidebar
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
