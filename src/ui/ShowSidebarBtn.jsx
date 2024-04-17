import { FaRegEye } from "react-icons/fa";

function ShowSidebarBtn({ isHidden, onHide }) {
  return (
    <div
      className={`bg-purple-color text-font-color absolute bottom-3 z-50 flex w-[170px] translate-x-[-210px] transform cursor-pointer items-center justify-center gap-2 rounded-r-full p-3 text-sm font-bold transition-all duration-500 ${isHidden ? `translate-x-[0]` : ""}`}
      onClick={onHide}
    >
      <FaRegEye className="h-4 w-4" />
      <span className="inline-block">Show Sidebar</span>
    </div>
  );
}

export default ShowSidebarBtn;
