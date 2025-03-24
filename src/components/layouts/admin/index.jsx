import { Outlet } from "react-router-dom";
import { getSlotContent } from "../../../utils/templateUtils";
import { Sidebar as DefaultSidebar } from "../../organism";

export function AdminLayout({ children }) {
  // Get custom sidebar if provided, otherwise use default
  const customSidebar = getSlotContent(children, DefaultSidebar);

  return (
    <div className="flex">
      {customSidebar || <DefaultSidebar />}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}
