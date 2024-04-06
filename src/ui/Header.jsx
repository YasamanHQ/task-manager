import { Link, useLocation } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Header({ onOpen }) {
  const { pathname } = useLocation();

  return (
    <header className="col-span-full grid w-[100vw] grid-cols-[18rem_1fr] border-b-2 border-b-[--border-color] bg-[--bg-color] px-6 transition-all duration-300 dark:border-b-[--dark-border-color] dark:bg-[--dark-bg-color]">
      <div className="flex h-[100px] items-center gap-3 transition-all duration-300 dark:text-[--font-color]">
        <img src="/logo.png" alt="logo-img" className="mt-1" />
        <Link
          to="/platformLaunch"
          className="inline-block text-[30px] font-bold text-[--light-title-font-color] transition-all duration-300 dark:text-[--font-color]"
        >
          kanban
        </Link>
      </div>

      <div className="flex items-center justify-between font-semibold text-[--light-title-font-color] transition-all duration-300">
        <h1 className="text-2xl transition-all duration-300 dark:text-[--font-color]">
          {pathname.slice(0).charAt(1).toUpperCase() +
            pathname
              .slice(2)
              .split(/(?=[A-Z])/)
              .join(" ")}
        </h1>

        <div className="flex justify-between gap-4">
          <button
            className="rounded-full bg-[--purple-color] px-6 py-3 text-sm text-[--font-color]"
            onClick={() => onOpen((isOpen) => !isOpen)}
          >
            +Add New Task
          </button>

          <span className="cursor-pointer self-center text-2xl text-[--sidebar-font-color] transition-all duration-300 hover:text-[--purple-color]">
            <HiOutlineDotsVertical />
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
