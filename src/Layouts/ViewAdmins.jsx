import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import NoData from "../Components/ui/NoData";
import adminApiRequests from "../services/apiRequests/adminApiRequests";
import Loading from "../Components/ui/Loading";
import DeleteConfirmModal from "../Components/viewAdmins/DeleteConfirmModal";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";

function ViewAdmins() {
  // const { branches } = useBranchesAndTracks();

  // const [selectedBranch, setSelectedBranch] = useState("All");
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const response = await adminApiRequests.getAllAdmins();
      setAdmins(response.admins);
    } catch (error) {
      setError(
        error.message || "Error Fetching admins, Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // const filteredAdmins =
  //   selectedBranch === "All"
  //     ? admins
  //     : admins.filter(
  //         (admin) =>
  //           (admin.branch?.name || "No branch assigned") === selectedBranch
  //       );

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
        await adminApiRequests.deleteAdminById(adminToDelete._id);
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin._id !== adminToDelete._id)
        );
      } catch (error) {
        console.error("Error deleting admin:", error);
        setError("Failed to delete admin. Please try again later.");
      } finally {
        closeModal();
      }
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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

      {admins.length > 0 ? (
        <div className="px-2 py-6 max-w-full overflow-x-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-main font-bold text-center pb-4 sm:pb-6">
            Admins
          </h1>

          {/* <div className="flex justify-center mb-6">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-2 my-10 border w-4/5 border-main rounded shadow-sm"
            >
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="w-full overflow-x-auto">
            <table className="table-auto w-full  bg-main-w shadow-md rounded-lg  sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-center  text-sm md:text-lg lg:text-2xl">
                  <th className="px-1 py-2 sm:px-4">Name</th>
                  <th className="px-1 py-2 sm:px-4">Branch</th>
                  <th className="px-1 py-2 sm:px-4">Email</th>
                  <th className="px-1 py-2 sm:px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-gray-50 transition-all text-center text-xs sm:text-sm md:text-lg lg:text-xl"
                  >
                    <td className="px-1 py-2 sm:px-4  ">{admin.fullName}</td>
                    <td className="px-1 py-2 sm:px-4 ">
                      {admin.branch?.name || "No branch"}
                    </td>
                    <td className="px-1 py-2 sm:px-4 break-all  ">
                      {admin.email}
                    </td>
                    <td className="px-1 py-2 sm:px-4">
                      <button
                        className="text-main text-xs lg:text-lg font-bold flex items-center justify-center gap-1 hover:scale-105 transition-transform mx-auto"
                        onClick={() => openModal(admin)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
