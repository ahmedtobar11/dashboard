import { useState } from "react";
import Button from "../ui/Button";
import DetailsModal from "./DetailsModal";

function RequestCard({
  registrationRequest,
  handleReject,
  disableBtns,
  handleAccept,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white bg-gradient-to-b from-main-light to-gray-50 rounded-xl shadow-md p-6 mb-6 border border-gray-300 hover:shadow-lg transition-shadow duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-4">
        <div className="text-center md:text-left">
          <div className="avatar mb-2 mx-auto md:mx-0">
            <div className="w-24 rounded-full">
              <img src={registrationRequest.personalPhoto} />
            </div>
          </div>
          <p className="text-lg font-semibold md:text-xl text-gray-800">
            {registrationRequest.fullName}
          </p>
          <span className="text-sm text-red-600 md:text-xl block mt-1">
            {registrationRequest.email}
          </span>
        </div>

        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <Button
            text="More Details"
            variant="outline"
            size="sm"
            onClick={() => setShowModal(true)}
            className="hover:bg-main-light transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="text-center md:text-left">
          <p className="break-words text-lg md:text-xl overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
            <span className="font-bold">Track:</span>
            {registrationRequest.trackName}
          </p>
        </div>
        <div className="text-center md:text-left">
          <p className="break-words text-lg md:text-xl overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
            <span className="font-bold">Graduation Year:</span>
            {registrationRequest.itiGraduationYear}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="break-words text-lg md:text-xl overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
            <span className="font-bold">City of Birth:</span>
            {registrationRequest.cityOfBirth}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="break-words text-lg md:text-xl overflow-hidden text-ellipsis whitespace-nowrap max-w-[300px]">
            <span className="font-bold">Graduation Branch:</span>
            {registrationRequest.branch}
          </p>
        </div>
      </div>

      <div className="flex justify-between md:justify-between gap-4">
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

      <DetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={registrationRequest}
      />
    </div>
  );
}

export default RequestCard;
