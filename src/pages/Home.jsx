import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import { Ellipsis } from "lucide-react";


function Home() {
    const [open, setOpen] = useState(window.innerWidth >= 768);
  return (
    <section >
    <div className="bg-light-dark h-6 px-2 text-text hidden md:block ">
    <Ellipsis
      size={30}
      className="cursor-pointer"
      onClick={() => setOpen(!open)}
    />
  </div>
  <div className="flex">
     <Sidebar open={open}  setOpen={setOpen}/>
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default Home;
