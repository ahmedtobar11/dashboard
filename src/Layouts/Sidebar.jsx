import { useEffect, useState } from "react";
import { House, Search, Fingerprint, LogOut, CircleUser,View,UserRoundPlus } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: House },
    {
      name: "View Admin",
      link: "/view-admins",
      icon: View,
    },
    {
      name: "Create New Admin",
      link: "/create-new-admin",
      icon: UserRoundPlus,
    },
    { name: "View Graduates", link: "view-and-export-graduates", icon: Search },
    {
      name: "Registration Requests",
      link: "/registration-requests",
      icon: Fingerprint,
    },
   
    { name: "Logout", link: "/", icon: LogOut, margin: true },
  ];

  // Close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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
      <section className="flex gap-6">
        <div
          className={`bg-main-light min-h-screen flex flex-col ${
            open ? "w-72" : "w-16"
          } duration-500`}
        >
          {open && (
            <div className="flex flex-col justify-center items-center border-b-2 pt-5">
              <div className="whitespace-pre duration-500  text-text">
                <CircleUser size={75} />
              </div>
              <p className="text-text whitespace-pre duration-500">
                admin name
              </p>
              <p className="mb-3 text-text whitespace-pre duration-500">
                admin@gmail.com
              </p>
            </div>
          )}

          <div className="flex-grow">
            <div className="flex flex-col gap-4 relative m-4 text-text">
              {menus?.map((menu, i) => (
                <NavLink
                  to={menu?.link}
                  key={i}
                  className={({ isActive }) =>
                    `${
                      menu?.margin ? "" : ""
                    } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:bg-gray-200 ${
                      isActive ? "text-xl text-main font-bold" : ""
                    } `
                  }
                >
                  <div>{menu?.icon && <menu.icon size="20" />}</div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 w-0 overflow-hidden group-hover:min-w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ))}
            </div>
          </div>

          {open && (
            <img className="mt-auto " src="itilogo.png" alt="iti Image" />
          )}
        </div>
      </section>
    </section>
  );
};

export default Sidebar;
