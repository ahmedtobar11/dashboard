import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { Ellipsis, Phone } from "lucide-react";

function Home() {
  const [open, setOpen] = useState(window.innerWidth >= 1025);

  return (
    <section>
      <div className="sticky top-0   bg-light-dark h-6 px-2 text-text hidden lg:flex justify-between z-10 ">
        <Ellipsis
          size={30}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
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
