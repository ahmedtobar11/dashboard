import React, { useState, useEffect } from "react";
import { Fingerprint, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";
import Loading from "../Components/ui/Loading";
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
import chartsDataApiRequests from "../services/apiRequests/chartsDataApiRequests";
import { useAdminContext } from "../contexts/AdminContext";
import Error from "../Components/ui/Error";
import { useToast, TOAST_TYPES } from "../hooks/useToast";

const menus = [
  { name: "View Graduates", link: "/view-and-export-graduates", icon: Search },
  {
    name: "Validate Graduate",
    link: "/registration-requests",
    icon: Fingerprint,
  },
];

const Dashboard = () => {
  const [graduateData, setGraduateData] = useState([]);
  const [totalGraduates, setTotalGraduates] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { branches, tracks } = useBranchesAndTracks();
  const { showToast, ToastContainer } = useToast();

  const COLORS = ["#9d312e", "#f54d48"];

  const branchAndTrackData = [
    { name: "Branches", count: branches.length },
    { name: "Tracks", count: tracks.length },
  ];

  const pieChartData = [
    {
      name: "Port Said Graduates",
      value:
        graduateData.find((branch) => branch.branch === "Portsaid")
          ?.graduates || 0,
    },
    {
      name: "Other Graduates",
      value:
        totalGraduates -
        (graduateData.find((branch) => branch.branch === "Portsaid")
          ?.graduates || 0),
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const response = await chartsDataApiRequests.getChartsData();
      if (
        response.data &&
        response.data.success &&
        Array.isArray(response.data.data)
      ) {
        setGraduateData(response.data.data);
        const total = response.data.data.reduce(
          (sum, branch) => sum + (branch.graduates || 0),
          0
        );
        setTotalGraduates(total);
      }
    } catch (error) {
      setError(
        error.message ||
          "An error occurred while fetching data. Please try again later or contact support."
      );
      showToast(error.message, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold text-xs sm:text-sm">{data.name}</p>
          <p className="text-xs sm:text-sm">{`Graduates: ${data.value}`}</p>
          <p className="text-xs sm:text-sm">{`Percentage: ${(
            (data.value / totalGraduates) *
            100
          ).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mt-8">
        <Error message={error} />
        <ToastContainer />
      </div>
    );
  }
  return (
    <div className="container max-w-screen-xl mx-auto px-4 md:mt-2 bg-main-light rounded-lg shadow-lg pt-3 pb-1">
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-main mb-6">
        ITI Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        {menus.map((menu) => (
          <Link
            to={menu?.link}
            key={menu?.name}
            className="bg-white p-4 sm:p-6 rounded-lg text-main text-center shadow-md flex items-center justify-center text-sm sm:text-base lg:text-lg xl:text-xl font-semibold border border-main hover:bg-main hover:text-white transition-all duration-300 ease-in-out"
          >
            <div className="mr-3">{menu?.icon && <menu.icon size={24} />}</div>
            {menu?.name}
          </Link>
        ))}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 relative">
        <span className="text-xs sm:text-sm text-main absolute top-1 left-1">
          Number of Graduates: {totalGraduates}
        </span>
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-main font-bold text-center mb-6">
          Graduates by Branch
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={graduateData}>
            <XAxis dataKey="branch" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Bar dataKey="graduates" fill="#9d312e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-main font-bold text-center mb-6">
            Numbers About ITI
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchAndTrackData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="count" fill="#9d312e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex-1">
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-main font-bold text-center mb-6">
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
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                }) => {
                  const radius =
                    innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
                  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl text-main font-bold text-center mb-6">
          Empowering the Next Generation of Innovators
        </h3>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:px-8 py-4">
          <p className="mb-5 lg:mb-0 lg:w-[60%] text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed lg:leading-loose text-justify">
            <span className="font-semibold text-main">
              The Information Technology Institute (ITI)
            </span>
            is a leading Egyptian institute, established in 1993, specializing
            in training and preparing graduates in the field of IT. With a
            commitment to excellence and innovation,ITI continues to shape the
            future of technology education in Egypt.
          </p>
          <img
            className="w-32 h-32 hidden lg:block lg:w-56 lg:h-56 object-contain"
            src="/itilogo.png"
            alt="ITI Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
