import { useState, useEffect } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { AlignJustify, Phone } from "lucide-react";
import { useAdminContext } from "../contexts/AdminContext";
import { ShieldPlus, ShieldCheck } from 'lucide-react';

function Home() {
  const [open, setOpen] = useState(false);
  const { admin } = useAdminContext();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 1025);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <header className="sticky top-0 bg-main-light px-4 flex justify-between items-center z-30 h-12">
        <AlignJustify
          size={30}
          className="cursor-pointer lg:hidden text-main"
          onClick={() => setOpen(!open)}
        />
        <p className="text-main font-semibold whitespace-pre flex items-center">
          <span className="mr-2">Welcome,</span>
          {getAdminRoleDisplay()}
        </p>
        <div className="text-main font-bold hidden sm:flex items-center space-x-4">
          <a href="tel:17002" className="flex items-center">
            <Phone size={20} className="mr-1"/> 17002
          </a>
          <a href="mailto:ITIinfo@iti.gov.eg">ITIinfo@iti.gov.eg</a>
        </div>
      </header>
      <div className="flex relative flex-grow overflow-hidden">
        <aside
          className={`absolute lg:relative z-20 h-full transition-all duration-300 ${
            open ? 'left-0' : '-left-64'
          } lg:left-0`}
        >
          <Sidebar open={open} setOpen={setOpen} />
        </aside>
        <div className="flex-grow overflow-auto p-4 md:px-12 lg:px-14">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Home;
