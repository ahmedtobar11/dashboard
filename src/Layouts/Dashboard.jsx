import { Fingerprint, LogOut, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";

const menus = [
  { name: "View Graduates", link: "/view-and-export-graduates", icon: Search },
  {
    name: "Validate Graduate",
    link: "/registration-requests",
    icon: Fingerprint,
  },
];

const Dashboard = () => {
  const { branches, tracks } = useBranchesAndTracks();

  return (
    <div className="container max-w-screen-lg mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-6">
        {menus.map((menu) => (
          <Link
            to={menu?.link}
            key={menu?.name}
            className="bg-white p-7 rounded-md text-main text-center shadow-lg flex items-center justify-center text-lg font-bold border border-text"
          >
            <div className="mr-2 mt-1">
              {menu?.icon && <menu.icon size={25} />}
            </div>
            {menu?.name}
          </Link>
        ))}
      </div>

      <h2 className="text-center my-10 text-main text-2xl font-bold">
        About Graduate Archive
      </h2>

      <div className="border border-text p-5">
        <h3 className="text-main text-xl font-bold text-center mb-3">
          Empowering the Next Generation of Innovators
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center md:px-8 py-4">
          <p className="mb-5 md:mb-0 md:w-[60%]">
            The Information Technology Institute (ITI) is a leading Egyptian
            institute established in 1993, specializing in training and
            preparing graduates in the field of IT. It offers advanced programs
            such as the "ITI Scholarship," a 9-month program aimed at equipping
            young people with the necessary skills to enter the job market in
            areas like programming, artificial intelligence, and cybersecurity.
            ITI significantly contributes to Egypt's digital transformation by
            training thousands annually for roles in both local and
            international companies. It also supports entrepreneurs and
            innovation through specialized programs and competitions,
            collaborating with global tech companies like IBM and Google to
            enhance training and provide internationally recognized
            certifications!
          </p>
          <img
            className="w-40 h-40 md:w-56 md:h-56"
            src="/itilogo.png"
            alt="ITI Logo"
          />
        </div>
      </div>

      <div className="border border-text p-5 my-5">
        <h3 className="text-main text-xl font-bold text-center mb-3">
          Numbers About ITI
        </h3>
        <div className="flex flex-col sm:flex-row justify-between px-8 py-4">
          <p className="font-bold mb-2 sm:mb-0">
            Number of branches: <span className="ml-5">{branches.length}</span>
          </p>
          <p className="font-bold">
            Number of tracks: <span className="ml-5">{tracks.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
