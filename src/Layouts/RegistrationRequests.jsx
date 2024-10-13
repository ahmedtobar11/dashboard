import { useEffect, useState } from "react";

import RequestCard from "../Components/registrationRequests/RequestCard";
import Loading from "../Components/ui/Loading";
import NoData from "../Components/ui/NoData";
import registrationRequestsApiRequests from "../services/apiRequests/registrationRequestsApiRequests";

function RegistrationRequests() {
  const [registrationRequests, setRegistrationRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response =
        await registrationRequestsApiRequests.getAllRegistrationRequests();
      console.log(response);
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
          {registrationRequests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      ) : (
        <NoData
          title="EMPTY"
          description="No Requests to show"
          buttonText="home"
          buttonTo="/"
        />
      )}
    </>
  );
}

export default RegistrationRequests;
