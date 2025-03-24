import { Outlet } from "react-router-dom";
import { getSlotContent } from "../../../utils/templateUtils";
import { Sidebar as DefaultSidebar } from "../../organism";

export function AdminLayout({ children, variant = 'default' }) {
  // The components need to have a static property called slotName to place the component dinamically 
  const customSidebar = getSlotContent(children, DefaultSidebar) || <DefaultSidebar />;

  const layouts = {
    // Default layout (sidebar on left)
    default: (
      <div className="flex min-h-screen">
        {customSidebar}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    ),
    
    // Sidebar on top
    horizontal: (
      <div className="min-h-screen">
        <div className="w-full bg-gray-800 p-4">
          {customSidebar}
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    ),
    
    // Sidebar on right
    reversed: (
      <div className="flex min-h-screen">
        <div className="flex-1 p-8">
          <Outlet />
        </div>
        {customSidebar}
      </div>
    )
  };

  return layouts[variant] || layouts.default;
}
