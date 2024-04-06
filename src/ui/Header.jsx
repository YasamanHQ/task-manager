import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

function Header({ onOpen }) {
  return (
    <div className="col-span-full grid grid-cols-[18rem_1fr] border-b-2 border-b-[--border-color] bg-[--bg-color] px-6 transition-all duration-300 dark:border-b-[--dark-border-color] dark:bg-[--dark-bg-color]">
      <div className="flex h-[100px] items-center gap-3 transition-all duration-300 dark:text-[--font-color]">
        <img src="/logo.png" alt="logo-img" className="mt-1" />
        <Link
          to="/platform"
          className="inline-block text-[30px] font-bold text-[--light-title-font-color] transition-all duration-300 dark:text-[--font-color]"
        >
          kanban
        </Link>
      </div>

      <header className="flex items-center justify-between font-semibold text-[--light-title-font-color] transition-all duration-300">
        <h1 className="text-2xl transition-all duration-300 dark:text-[--font-color]">
          Platform Launch
        </h1>

        <div className="flex justify-between gap-4">
          <button
            className="rounded-full bg-[--purple-color] px-6 py-3 text-sm text-[--font-color]"
            onClick={() => onOpen((isOpen) => !isOpen)}
          >
            +Add New Task
          </button>

          <span className="self-center text-2xl text-[--sidebar-font-color]">
            <HiOutlineDotsVertical />
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
