import { useEffect, useState } from "react";

import RequestCard from "../Components/registrationRequests/RequestCard";
import { requestsData } from "../../public/requestsData";
import Loading from "../Components/ui/Loading";
import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";

function RegistrationRequests() {
  const [graduates, setGraduates] = useState(requestsData);
  const [isLoading, setIsLoading] = useState();

  const fetchData = () => {
    try {
      setIsLoading(true);
      const responseData = graduatesApiRequests.getAllGraduates();
      // setGraduates(responseData)
      console.log(responseData);
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(graduates);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {graduates.length >= 0 ? (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-medium mb-6 text-center text-main">
            ITi graduate applications
          </h1>
          {graduates.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <p>create no data component</p>
      )}
    </div>
  );
}

export default RegistrationRequests;
