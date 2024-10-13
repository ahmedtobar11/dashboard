import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import NoData from "../Components/ui/NoData";
import { getAdmin, deleteAdminById } from "../services/apiRequests/adminApiRequests";
import Loading from "../Components/ui/Loading";
import DeleteConfirmModal from "../Components/viewAdmins/DeleteConfirmModal"; 

function ViewAdmins() {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [adminsData, setAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const branches = ["All", ...new Set(adminsData.map((admin) => admin.branch?.name || "No branch assigned"))];

  useEffect(() => {
    fetchAdminsData();
  }, []);

  const filteredAdmins =
    selectedBranch === "All"
      ? adminsData
      : adminsData.filter((admin) => (admin.branch?.name || "No branch assigned") === selectedBranch);

  const openModal = (admin) => {
    setAdminToDelete(admin);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAdminToDelete(null);
  };

  const confirmDelete = async () => {
    if (adminToDelete) {
      try {
        await deleteAdminById(adminToDelete._id);
        setAdmin((prevAdmins) =>
          prevAdmins.filter((admin) => admin._id !== adminToDelete._id)
        );
        console.log("Admin deleted successfully!");
      } catch (error) {
        console.error("Error deleting admin:", error);
        setError("Failed to delete admin. Please try again later.");
      } finally {
        closeModal();
      }
    }
  };

  const fetchAdminsData = async () => {
    try {
      setIsLoading(true);
      const response = await getAdmin();
      setAdmin(response.admins);
      console.log(response.admins);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

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
              <tr className="bg-gray-100 text-center">
                <th className="px-4 py-2">Admin Name</th>
                <th className="px-4 py-2">Admin Branch</th>
                <th className="px-4 py-2">Admin Email</th>
                <th className="px-4 py-2">Admin Password</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-50 transition-all text-center">
                  <td className="px-4 py-2">{admin.fullName}</td>
                  <td className="px-4 py-2">
                    {admin.branch?.name || "No branch assigned"}
                  </td>
                  <td className="px-4 py-2">{admin.email}</td>
                  <td className="px-4 py-2">{"*******"}</td>

                  <td className="px-4 py-2">
                    <button
                      className="text-main font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                      onClick={() => openModal(admin)}
                    >
                      <Trash2 size={24} />
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
          title={"No Admins"}
          description="Super admin, you should create your first admin to display in the table."
          buttonText="Create My First Admin"
          buttonTo="/create-new-admin"
        />
      )}
    </>
  );
}

export default ViewAdmins;
