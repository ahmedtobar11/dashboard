import { useEffect, useState } from "react";

import RequestCard from "../Components/registrationRequests/RequestCard";
import { graduatesData } from "../../public/requestsData";
import Loading from "../Components/ui/Loading";
// import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";
import NoData from "../Components/ui/NoData"
function RegistrationRequests() {
  const [graduates, setGraduates] = useState(graduatesData);
  const [isLoading, setIsLoading] = useState();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // const response = await graduatesApiRequests.getAllGraduates();
      setGraduates(response);
      console.log(response);
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {graduates.length > 0 ? (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-medium mb-6 text-center text-main">
            ITi graduate applications
          </h1>
          {graduates.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        
        <NoData
        title="EMPTY"
      description="No Requests to valid"
      buttonText="home"
      buttonTo='/'
        />
      )}
    </>
  );
}

export default RegistrationRequests;
