import { FaSuitcase } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [activeLinks, setActiveLinks] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLinks(index);
  };

  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: FaSuitcase },
    { id: 2, path: "/subscription", name: "Subscriptions", icon: TbUser },
    { id: 3, path: "/platform", name: "Platforms", icon: FaSuitcase },
  ];

  return (
    <div className="w-full pt-8 px-4">
      <h3 className="text-lg font-semibold md:block mb-6">Arch</h3>
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
              activeLinks === index ? "bg-blue-100 text-indigo-500" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-start items-center md:space-x-3" 
            >
              
              <span>{link.icon()}</span>
          
              <span className="text-sm text-gray-500 ml-2">
                {link.name}
              </span>{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
