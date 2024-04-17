import { Link, useLocation } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "./Button";

function Header({ onOpen }) {
  const { pathname } = useLocation();

  return (
    <header className="bg-bkg-color border-b-border-color dark:bg-dark-bg-color dark:border-b-dark-border-color col-span-full grid w-[100vw] grid-cols-[18rem_1fr] border-b-2 px-6 transition-all duration-300">
      <div className="dark:text-font-color flex h-[100px] items-center gap-3 transition-all duration-300">
        <img src="/logo.png" alt="logo-img" className="mt-1" />
        <Link
          to="/platformLaunch"
          className="text-light-title-font-color dark:text-font-color inline-block text-[30px] font-bold transition-all duration-300"
        >
          kanban
        </Link>
      </div>

      <div className="text-light-title-font-color flex items-center justify-between font-semibold transition-all duration-300">
        <h1 className="dark:text-font-color text-2xl transition-all duration-300">
          {pathname.slice(0).charAt(1).toUpperCase() +
            pathname
              .slice(2)
              .split(/(?=[A-Z])/)
              .join(" ")}
        </h1>

        <div className="flex justify-between gap-4">
          {/* <button
            className="rounded-full bg-purple-color px-6 py-3 text-sm text-font-color"
            onClick={() => onOpen((isOpen) => !isOpen)}
          >
            +Add New Task
          </button> */}
          <Button type="button" onClick={() => onOpen((isOpen) => !isOpen)}>
            +Add New Task
          </Button>

          <span className="text-sidebar-font-color hover:text-purple-color cursor-pointer self-center text-2xl transition-all duration-300">
            <HiOutlineDotsVertical />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
