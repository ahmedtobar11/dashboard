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
      <div className="flex">
      <aside className={`  sticky  top-0 md:top-6  h-screen transition-all duration-300 'w-fit'`}>
      <Sidebar open={open} setOpen={setOpen} />
        </aside>
        <div className="flex-grow px-16 ">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Home;
