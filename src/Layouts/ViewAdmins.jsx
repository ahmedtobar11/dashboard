import { useState } from "react";
import { adminData } from "../../public/adminData";
import { Trash2 } from "lucide-react";
import NoData from "../Components/ui/NoData";

function ViewAdmins() {
  const [selectedBranch, setSelectedBranch] = useState("All");

  const branches = ["All", ...new Set(adminData.map((admin) => admin.branch))];
  const filteredAdmins =
    selectedBranch === "All"
      ? adminData
      : adminData.filter((admin) => admin.branch === selectedBranch);

  function deleteAdmin(id) {
    console.log("Delete admin with id:", id);
  }

  return (
    <>
      {filteredAdmins.length > 0 ? (
        <div className="px-4 py-6">
          <h1 className="text-2xl text-main font-bold text-center pb-6">
            Admins
          </h1>

          <div className="flex justify-center mb-6">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-2 my-10 border w-4/5 border-main rounded shadow-sm"
            >
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <table className="table-auto w-4/5 mx-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Admin Name</th>
                <th className="px-4 py-2">Admin Branch</th>
                <th className="px-4 py-2">Admin Email</th>
                <th className="px-4 py-2">Admin Password</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-2">{admin.name}</td>
                  <td className="px-4 py-2">{admin.branch}</td>
                  <td className="px-4 py-2">{admin.email}</td>
                  <td className="px-4 py-2">{admin.password}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-main font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                      onClick={() => deleteAdmin(admin.id)}
                    >
                      <Trash2 size={22} />
                      Delete Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData
          title="No Admins"
          description="Super admin, you should create your first admin to display in the table."
          buttonText="Create My First Admin"
          buttonTo="/create-new-admin"
        />
      )}
    </>
  );
}

export default ViewAdmins;
