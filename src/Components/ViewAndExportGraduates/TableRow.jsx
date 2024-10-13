import Button from "../ui/Button";

export default function TableRow({ grad, onExpandRow, isExpanded }) {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={grad.personalImageUrl || "avatar.jpg"}
                  alt={`Avatar of ${grad.fullName}`}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{grad.fullName}</div>
              <div className="text-sm opacity-50">{grad.email}</div>
            </div>
          </div>
        </td>
        <td className="text-left">
          {grad.trackName}
          <br />
          <span className="badge badge-ghost badge-sm text-nowrap text-center">
            {grad.branch}
          </span>
        </td>
        <td>
          {grad.university}
          <br />
          <span className="badge badge-ghost badge-sm text-nowrap">
            {grad.faculty}
          </span>
        </td>
        <th>
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => onExpandRow(grad._id)}
            text="more details"
          />
        </th>
      </tr>
      {isExpanded && (
        <tr className="bg-base-200 relative">
          <td colSpan="5">
            <button
              className="absolute top-1 right-1 w-8 h-8 rounded-full bg-main hover:bg-white text-white hover:text-main font-extrabold"
              onClick={() => onExpandRow(null)}
            >
              X
            </button>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Personal Info</h3>
                    <p>Mobile: {grad.mobile}</p>
                    <p>Birth City: {grad.cityOfBirth}</p>
                    <p>National ID: {grad.nationalId || "N/A"}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Education</h3>
                    <p>Program: {grad.program}</p>
                    <p>Intake: {grad.intake}</p>
                    <p>Graduation: {grad.itiGraduationYear}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Professional</h3>
                    <p>Job Title: {grad.fullJobTitle || "N/A"}</p>
                    <p>Company: {grad.companyName || "N/A"}</p>
                    <p>Experience: {grad.yearsOfExperience || 0} years</p>
                    <div className="mt-2">
                      <span className="badge badge-primary">
                        {grad.workedAsFreelancerBefore
                          ? "Freelancer"
                          : "Full-time"}
                      </span>
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
