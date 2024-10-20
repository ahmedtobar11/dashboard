import { useEffect } from "react";
import {
  House,
  Search,
  Fingerprint,
  LogOut,
  View,
  UserRoundPlus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import { useAdminContext } from "../contexts/AdminContext";
import { ShieldPlus,ShieldCheck} from 'lucide-react';

const Sidebar = ({ open, setOpen }) => {
  const { admin, setAdmin } = useAdminContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    authServices.logout(setAdmin);
    navigate("/login");
  };

  const menus = [
    { name: "Dashboard", link: "/", icon: House },
    {
      name: "View Admins",
      link: "/view-admins",
      icon: View,
      role: "super-admin",
    },
    {
      name: "Create New Admin",
      link: "/create-new-admin",
      icon: UserRoundPlus,
      role: "super-admin",
    },
    { name: "View Graduates", link: "view-and-export-graduates", icon: Search },
    {
      name: "Registration Requests",
      link: "/registration-requests",
      icon: Fingerprint,
    },
    {
      name: "Logout",
      link: "/login",
      icon: LogOut,
      action: handleLogout,
      margin: true,
    },
  ];
  const filteredMenus =
    admin?.role === "super admin"
      ? menus
      : menus.filter((menu) => !menu.role || menu.role === admin?.role);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1025) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <div
        className={`pt-2 bg-main-light min-h-screen flex flex-col  ${
          open ? "w-72" : "w-16"
        } duration-500`}
      >
        {open && (
          <div className="flex flex-col justify-center items-center border-b-2 pt-1">
            <div className="relative h-24 w-24 rounded-full  border-4 border-main   overflow-hidden">
              <img src="admin.jpg" alt="admin avatar"  />
            </div>
            <p className="my-1 text-center text-main font-semibold whitespace-pre duration-500  ">
              {admin.role === "super admin" ? (
                <span className=" flex gap-1 justify-center align-middle">
                  <ShieldPlus size={24} /> Super Admin
                </span>
              ) : (
                admin.fullName
              )}
            </p>

            <p className=" text-center text-main font-semibold whitespace-pre duration-500  pb-4 ">
              {admin.email}
            </p>
          </div>
        )}

        <div className="flex-grow flex flex-col  ">
          <div className="flex flex-col gap-4 md:gap-5  relative mx-auto my-5 text-text pb-5 pt-1 xl:my-0 lg:mb-28 ">
            {filteredMenus.map((menu, i) => (
              <NavLink
                to={menu.link}
                key={i}
                onClick={menu.action ? menu.action : null}
                className={({ isActive }) =>
                  `group flex items-center text-sm gap-3.5 font-medium p-1 rounded-md hover:bg-gray-200 ${
                    isActive ? "text-xl text-main font-bold" : ""
                  }`
                }
              >
                <div>{menu.icon && <menu.icon size="20" />}</div>
                <h2
                  style={{ transitionDelay: `${i + 3}00ms` }}
                  className={`whitespace-pre duration-500 ${
                    open
                      ? "opacity-1 translate-x-0"
                      : "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu.name}
                </h2>
                <h2
                  className={`
          ${open ? "hidden" : "absolute"} 
          left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg 
          px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14 
          group-hover:duration-300 w-0 overflow-hidden group-hover:w-auto
          z-0 transition-all ease-in-out duration-300
        `}
                >
                  {menu.name}
                </h2>
              </NavLink>
            ))}
          </div>
          {open && (
            <div className="flex justify-center items-center pb-2 ">
              <img
                className="max-w-52 max-h-52 object-cover"
                src="ColoredLogo.svg"
                alt="ITI Image"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
