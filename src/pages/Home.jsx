import { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { Ellipsis } from "lucide-react";

function Home() {
  const [open, setOpen] = useState(window.innerWidth >= 768);

  return (
    <section>
      <div className="sticky top-0 bg-light-dark h-6 px-2 text-text hidden md:block z-10 ">
      <Ellipsis
          size={30}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="flex  ">
      <div className={`pt-1 sticky top-6 h-screen transition-all duration-300 ${open ? 'w-64' : 'w-0'}`}>
      <Sidebar open={open} setOpen={setOpen} />
        </div>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Home;
