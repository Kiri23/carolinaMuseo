import { Link } from "react-router-dom";

export function Sidebar() {
  const menuItems = [
    { path: "/admin/page-builder", label: "Page Builder" },
    { path: "/admin/scenes", label: "Scenes" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Admin Panel</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link
              to={item.path}
              className="hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Add the static property using the slot design pattern
Sidebar.slotName = 'Sidebar';
