import { useCallback, useEffect, useState } from "react";

import RequestCard from "../Components/registrationRequests/RequestCard";
import Loading from "../Components/ui/Loading";
import NoData from "../Components/ui/NoData";
import registrationRequestsApiRequests from "../services/apiRequests/registrationRequestsApiRequests";
import { useAdminContext } from "../contexts/AdminContext";

function RegistrationRequests() {
  const { admin } = useAdminContext();

  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disableBtns, setDisableBtns] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      let response;
      if (admin?.role === "super admin") {
        response =
          await registrationRequestsApiRequests.getAllRegistrationRequests();
      } else if (admin?.role === "admin") {
        response =
          await registrationRequestsApiRequests.getRegistrationRequestsByBranch();
      }
      setRegistrationRequests(response.requests);
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReject = useCallback(async (registrationRequest) => {
    try {
      setDisableBtns(true);
      await registrationRequestsApiRequests.rejectRegistrationRequest(
        registrationRequest._id
      );
      setRegistrationRequests((prev) =>
        prev.filter((item) => {
          return item._id !== registrationRequest._id;
        })
      );
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setDisableBtns(false);
    }
  }, []);

  const handleAccept = useCallback(async (registrationRequest) => {
    try {
      setDisableBtns(true);
      const res =
        await registrationRequestsApiRequests.acceptRegistrationRequest(
          registrationRequest._id
        );
      setRegistrationRequests((prev) =>
        prev.filter((item) => {
          return item._id !== registrationRequest._id;
        })
      );
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setDisableBtns(false);
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {registrationRequests.length > 0 ? (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-medium mb-6 text-center text-main">
            ITi graduate applications
          </h1>
          {registrationRequests.map((registrationRequest) => (
            <RequestCard
              key={registrationRequest._id}
              registrationRequest={registrationRequest}
              handleReject={handleReject}
              handleAccept={handleAccept}
              disableBtns={disableBtns}
            />
          ))}
        </div>
      ) : (
        <NoData
          title="EMPTY"
          description="No Requests found."
          buttonText="DASHBOARD"
          buttonTo="/"
        />
      )}
    </>
  );
}

export default RegistrationRequests;
