import RequestCard from "../Components/RequestValidation/RequestCard";
import { requestsData } from "../../public/requestsData";

function RequestValidation() {
  return (
    <div>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-medium mb-6 text-center text-main">
          ITi graduate applications
        </h1>
        {requestsData.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}

export default RequestValidation;
