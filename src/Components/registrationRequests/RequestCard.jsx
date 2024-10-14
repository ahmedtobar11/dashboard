import { useState } from "react";
import Button from "../ui/Button";
import DetailsModal from "./DetailsModal";
import { Mail } from "lucide-react";

function RequestCard({
  registrationRequest,
  handleReject,
  disableBtns,
  handleAccept,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white bg-gradient-to-b from-main-light to-gray-50 rounded-xl shadow-md p-6 mb-6 border border-gray-300 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="flex flex-col items-center ">
          <div className="avatar ">
            <div className="w-24 rounded-full">
              <img src={registrationRequest.personalPhoto} />
            </div>
          </div>
          <p className="text-lg font-semibold text-center md:text-left md:text-xl text-gray-800 ">
            {registrationRequest.name}
          </p>
          <div
            className="flex items-center gap-1
           mt-2 text-sm text-red-600 md:text-xl"
          >
            <Mail />
            <span>{registrationRequest.email}</span>
          </div>
        </div>

        <div className="flex flex-col text-sm space-y-3 md:space-y-6 md:my-auto md:text-lg">
          <div className="flex gap-4 md:gap-10 ">
            <p className="break-words">
              <span className="font-medium">Graduation Branch:</span>{" "}
              {registrationRequest.branch}
            </p>
            <p className="break-words">
              <span className="font-medium">Track:</span>{" "}
              {registrationRequest.trackName}
            </p>
          </div>
          <div className="flex gap-4 md:gap-12">
            <p className="break-words">
              <span className="font-medium">Graduation Year:</span>{" "}
              {registrationRequest.itiGraduationYear}
            </p>
            <p className="break-words">
              <span className="font-medium">City of birth:</span>{" "}
              {registrationRequest.cityOfBirth}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          text="More Details"
          variant="outline"
          size="sm"
          onClick={() => setShowModal(true)}
          className="hover:bg-main-light transition-colors"
        />
        <div className="flex gap-4">
          <Button
            text="Reject"
            variant="outline"
            size="sm"
            disabled={disableBtns}
            onClick={() => {
              handleReject(registrationRequest);
            }}
            className="!text-red-600 !border-red-600 hover:!bg-red-100"
          />
          <Button
            text="Accept"
            size="sm"
            disabled={disableBtns}
            onClick={() => {
              handleAccept(registrationRequest);
            }}
            className="hover:bg-main hover:text-white transition-colors"
          />
        </div>
      </div>

      <DetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={registrationRequest}
      />
    </div>
  );
}

export default RequestCard;
