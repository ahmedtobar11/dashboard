import Button from "../ui/Button";

export default function TableRow({ grad, onExpandRow, isExpanded }) {
  console.log(grad);
  return (
    <>
      <tr className="text-xs md:text-sm  ">
        <td className="py-2 sm:py-4 md:px-8">
          <div className="flex flex-col lg:flex-row  items-center gap-1 sm:gap-2 ">
            <div className="avatar">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full ">
                <img
                  src={grad.personalPhoto || "avatar.jpg"}
                  alt={`Avatar of ${grad.fullName}`}
                />
              </div>
            </div>
            <div className="text-center ">
              <div className="font-semibold text-xs  lg:text-sm">
                {grad.fullName}
              </div>
              <div className="text-xs  opacity-80">{grad.email}</div>
            </div>
          </div>
        </td>
        <td className="text-xs   w-full ">
          <div>{grad.trackName}</div>
          <span className="badge badge-ghost badge-sm text-nowrap text-center ">
            {grad.branch}
          </span>
        </td>
        <td className="hidden md:table-cell">
          <div className="flex justify-center items-center h-full w-full flex-col text-xs   ">
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
        <tr className="bg-main-light relative my-5 ">
          <td colSpan="5" className="p-2 sm:p-4 md:p-6">
            <button
              className="absolute top-1 right-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-main hover:bg-white text-white hover:text-main font-extrabold text-xs sm:text-sm"
              onClick={() => onExpandRow(null)}
            >
              X
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title font-extrabold text-xs sm:text-base">
                    Personal Info
                  </h3>
                  <div className="flex justify-between text-start  md:flex-col  md:gap-7 md:mt-2">
                    <p className="text-xs sm:text-sm ">
                      <span className="font-semibold text-sm">Mobile:</span>
                      <span className=" text-xs">{grad.mobile}</span>
                    </p>
                    <p className="text-xs sm:text-sm ">
                      <span className="font-semibold text-sm">Birth City:</span>
                      <span className=" text-xs">{grad.cityOfBirth}</span>
                    </p>
                  </div>
                  <div className="md:hidden ">
                    <h3 className="card-title font-extrabold text-sm sm:text-base">
                      Education Info
                    </h3>
                    <div className="text-start ">

                    <div >
                      <span className="font-semibold text-sm">University:</span>
                      <span className=" text-xs">{grad.university}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-sm">Faculty:</span>
                      <span className=" text-xs ">{grad.faculty}</span>
                     
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title font-extrabold text-sm sm:text-base">
                    prefer Info
                  </h3>
                  <div>
                    <span className="font-semibold text-sm">
                      preferred Courses To Teach :
                    </span>
                    <br/>
                    {grad.preferredCoursesToTeach.map((e) => {
                      return (
                        <span className="badge badge-ghost badge-sm text-nowrap text-center m-1">
                          {e}
                        </span>
                      );
                    })}
                  </div>
                  <div>
                    <span className="font-semibold text-sm">
                      preferred Teaching Branches :
                    </span>
                    <br/>
                    {grad.preferredTeachingBranches.map((e) => {
                      return (
                        <span className="badge badge-ghost badge-sm text-nowrap text-center m-1">
                          {e}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-3 sm:p-4">
                  <h3 className="card-title font-extrabold text-sm sm:text-base">
                    Professional
                  </h3>

                  <div className="text-start flex flex-col gap-2">

                  <p className="text-xs lg:text-sm">
                     <span className="font-semibold">Job Title: </span>
                    {grad.fullJobTitle || "No job yet"}
                  </p>
                  <div className="flex justify-between md:flex-col  gap-2">
                    <p className="text-xs lg:text-sm">
                       <span className="font-semibold">Company:</span>                      {grad.companyName || "No job yet"}
                    </p>
                    <p className="text-xs lg:text-sm">
                       <span className="font-semibold">Experience:</span> {grad.yearsOfExperience || 0}
                      {` years`}
                    </p>
                  </div>
                  {grad.linkedin ? (
                    <p className="text-xs lg:text-sm ">
                       <span className="font-semibold">
                        <a
                          target="_blank"
                          href={grad.linkedin}
                          className="text-blue-500 cursor-pointer"
                        >
                          show linkedin
                        </a>
                      </span>
                    </p>
                  ) : (
                    ""
                  )}

                  <div className="mt-2">
                    <span className="badge  text-white   bg-main font-extrabold text-xs">
                      {grad.hasFreelanceExperience
                        ? "Had Freelance Experience"
                        : "No Freelance Experience"}
                    </span>
                  </div>
                 </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className=" p-3 lg:p-5">
                  <h3 className="card-title font-extrabold text-sm lg:text-base"> ITI </h3>
                  <div className="text-start flex flex-col gap-2">
                  <p className="text-xs lg:text-sm ">
                     <span className="font-semibold">Program:</span>
                    <span className="text-xs">{grad.program}</span>
                  </p>
                  <div className="flex justify-between md:flex-col  gap-2">
                    <p className="text-xs lg:text-sm">
                       <span className="font-semibold">Intake:</span> {grad.intake}
                    </p>
                    <p className="text-xs lg:text-sm">
                       <span className="font-semibold">Graduation:</span> {grad.itiGraduationYear}
                    </p>
                  </div>
                  </div>
                
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
