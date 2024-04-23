import { BsWindowSidebar } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Board({ pathname, children }) {
  return (
    <li className="relative cursor-pointer text-sidebar-font-color hover:text-purple-color">
      <NavLink to={pathname} className="relative flex items-center gap-3">
        <BsWindowSidebar />
        {children}
      </NavLink>
    </li>
  );
}

export default Board;
