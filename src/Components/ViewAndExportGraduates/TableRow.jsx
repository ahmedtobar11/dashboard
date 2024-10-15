import Button from "../ui/Button";

export default function TableRow({ grad, onExpandRow, isExpanded }) {
  return (
    <>
      <tr className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <td className="py-2 sm:py-4 md:px-8">
          <div className="flex flex-col lg:flex-row  items-center gap-1 sm:gap-2 ">
            <div className="avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <img
                  src={grad.personalPhoto || "avatar.jpg"}
                  alt={`Avatar of ${grad.fullName}`}
                />
              </div>
            </div>
            <div className="text-center ">
              <div className="font-bold">{grad.fullName}</div>
              <div className="text-xs sm:text-sm opacity-80">{grad.email}</div>
            </div>
          </div>
        </td>
        <td className="text-center pt-5 ">
          <div>{grad.trackName}</div>
          <span className="badge badge-ghost badge-sm text-nowrap text-center mt-1">
            {grad.branch}
          </span>
        </td>
        <td className="hidden md:table-cell">
          <div className="flex justify-center items-center h-full w-full flex-col">
            <div>{grad.university}</div>
            <div>
              <span className="badge badge-ghost badge-sm text-nowrap text-center mt-1">
                {grad.faculty}
              </span>
            </div>
          </div>
        </td>
        <th className=" sm:p-2 md:p-4">
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => onExpandRow(grad._id)}
            text="more details"
            className="text-xs sm:text-sm"
          />
        </th>
      </tr>
      {isExpanded && (
        <tr className="bg-base-200 relative">
          <td colSpan="5" className="p-2 sm:p-4 md:p-6">
            <button
              className="absolute top-1 right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-main hover:bg-white text-white hover:text-main font-extrabold text-xs sm:text-sm"
              onClick={() => onExpandRow(null)}
            >
              X
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title text-sm sm:text-base">
                    Personal Info
                  </h3>
                  <p className="text-xs sm:text-sm">
                    <strong>Mobile:</strong> {grad.mobile}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>Birth City:</strong> {grad.cityOfBirth}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>National ID:</strong> {grad.nationalId || "N/A"}
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title text-sm sm:text-base">Education</h3>
                  <p className="text-xs sm:text-sm">
                    <strong>Program:</strong> {grad.program}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>Intake:</strong> {grad.intake}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>Graduation:</strong> {grad.itiGraduationYear}
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title text-sm sm:text-base">
                    Professional
                  </h3>
                  <p className="text-xs sm:text-sm">
                    <strong>Job Title:</strong> {grad.fullJobTitle || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>Company:</strong> {grad.companyName || "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm">
                    <strong>Experience:</strong> {grad.yearsOfExperience || 0}{" "}
                    years
                  </p>
                  <div className="mt-2">
                    <span className="badge  text-white   bg-main font-extrabold text-xs">
                      {grad.hasFreelanceExperience
                        ? "Had Freelance Experience"
                        : "No Freelance Experience"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:hidden card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title text-sm sm:text-base">
                    ITI Education Info
                  </h3>
                  <div>{grad.university}</div>
                  <span className="badge badge-ghost badge-sm text-nowrap mt-1">
                    {grad.faculty}
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
