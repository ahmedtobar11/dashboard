import { Fingerprint, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const menus = [
  { name: "View Graduates", link: "/view-and-export-graduates", icon: Search },
  {
    name: "Validate Graduate",
    link: "/registration-requests",
    icon: Fingerprint,
  },
];

const graduateData = [
  { branch: "Cairo", Graduates: 120 },
  { branch: "Alex", Graduates: 60 },
  { branch: "Port Said", Graduates: 20 },
  { branch: "Aswan", Graduates: 50 },
  { branch: "Assiut", Graduates: 45 }, 
  { branch: "Ismailia", Graduates: 30 }, 
  { branch: "Mansoura", Graduates: 25 }, 
  { branch: "Tanta", Graduates: 35 }, 
  { branch: "Sohag", Graduates: 40 }, 
  { branch: "Minya", Graduates: 22 }, 
  { branch: "Zagazig", Graduates: 28 }, 
  { branch: "Benha", Graduates: 33 }, 
  { branch: "Beni Suef", Graduates: 27 }, 
  { branch: "Fayoum", Graduates: 15 }, 
  { branch: "Qena", Graduates: 18 }, 
];


const totalGraduates = graduateData.reduce(
  (sum, branch) => sum + branch.Graduates,
  0
);

const Dashboard = () => {
  const { branches, tracks } = useBranchesAndTracks();

  const COLORS = ["#9d312e", "#f54d48"];

  const branchAndTrackData = [
    { name: "Branches", count: branches.length },
    { name: "Tracks", count: tracks.length },
  ];

  const pieChartData = [
    { name: "Port Said Graduates", value: 20 },
    { name: "Other Graduates", value: totalGraduates - 20 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>{`Graduates: ${data.value}`}</p>
          <p>{`Percentage: ${((data.value / totalGraduates) * 100).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container max-w-screen-xl mx-auto px-4 mt-2 bg-main-light rounded-lg shadow-lg pt-3 pb-1">
      <h1 className="text-3xl font-bold text-center text-main mb-6">ITI Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        {menus.map((menu) => (
          <Link
            to={menu?.link}
            key={menu?.name}
            className="bg-white p-6 rounded-lg text-main text-center shadow-md flex items-center justify-center text-lg font-semibold border border-main hover:bg-main hover:text-white transition-all duration-300 ease-in-out"
          >
            <div className="mr-3">
              {menu?.icon && <menu.icon size={28} />}
            </div>
            {menu?.name}
          </Link>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
        <span className='text-sm text-main absolute top-1 left-1'>Number of Graduates: {totalGraduates}</span>
        <h3 className="text-main text-2xl font-bold text-center mb-6">
          Graduates by Branch
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graduateData}>
            <XAxis dataKey="branch" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Graduates" fill="#9d312e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-main text-2xl font-bold text-center mb-6">
            Numbers About ITI
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchAndTrackData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#9d312e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-main text-2xl font-bold text-center mb-6">
            Port Said vs Other Graduates
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return (
                    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-main text-2xl font-bold text-center mb-6">
          Empowering the Next Generation of Innovators
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center md:px-8 py-4">
          <p className="mb-5 md:mb-0 md:w-[60%] text-gray-700 leading-relaxed">
            The Information Technology Institute (ITI) is a leading Egyptian
            institute established in 1993, specializing in training and
            preparing graduates in the field of IT. With a commitment to
            excellence and innovation, ITI continues to shape the future of
            technology education in Egypt.
          </p>
          <img
            className="w-40 h-40 hidden md:block md:w-56 md:h-56 object-contain"
            src="/itilogo.png"
            alt="ITI Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
