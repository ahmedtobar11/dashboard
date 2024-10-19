import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { Ellipsis, Phone } from "lucide-react";
import { useAdminContext } from "../contexts/AdminContext";
import { ShieldPlus,ShieldCheck} from 'lucide-react';

function Home() {
  const [open, setOpen] = useState(window.innerWidth >= 1025);
  const { admin} = useAdminContext();
  const getAdminRoleDisplay = () => {
    if (admin.role === "super admin") {
      return (
        <span className="flex gap-2 justify-center items-center">
          <ShieldPlus size={20} />
          Super Admin
        </span>
      );
    } else if (admin.role === "admin") {
      return (
        <span className="flex gap-2 justify-center items-center">
          <ShieldCheck size={20} />
          Admin - {admin.branch || "Branch Not Specified"}
        </span>
      );
    } else {
      return admin.role;
    }
  };

  return (
    <section className="flex flex-col h-screen">
      <div className="sticky top-0 bg-light-dark px-2 text-text flex justify-between items-center z-10 h-12">
        <Ellipsis
          size={30}
          className="cursor-pointer hidden lg:block"
          onClick={() => setOpen(!open)}
        />
        <p className=" pl-5 text-center text-main font-semibold whitespace-pre flex">
          <span className="mr-2">Welcome,</span>
          {getAdminRoleDisplay()}
        </p>
        <div className="text-main font-bold w-64 pr-5  mr-10 flex justify-between ">
          <a href="tel:17002" className="flex justify-around w-20 align-baseline">
            <Phone size={20} className="pt-1"/> 17002
          </a>
          <a href="mailto:ITIinfo@iti.gov.eg"> ITIinfo@iti.gov.eg</a>
        </div>
      </div>
      <div className="flex">
        <aside
          className={`  sticky  top-0 lg:top-6  h-screen transition-all duration-300 'w-fit'`}
        >
          <Sidebar open={open} setOpen={setOpen} />
        </aside>
        <div className="flex-grow md:px-12 lg:px-14">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Home;
