import { FaRegEye } from "react-icons/fa";

function ShowSidebarBtn({ isHidden, onHide }) {
  return (
    <div
      className={`absolute bottom-3 z-50 flex w-[170px] translate-x-[-210px] cursor-pointer items-center justify-center gap-2 rounded-r-full bg-[--purple-color] p-3 text-sm font-bold text-[--font-color] transition-all duration-500 ${isHidden ? `translate-x-[-10px]` : ""}`}
      onClick={onHide}
    >
      <FaRegEye className="h-4 w-4" />
      <span className="inline-block">Show Sidebar</span>
    </div>
  );
}

export default ShowSidebarBtn;
