import Button from "../ui/Button";

export default function TableRow({ row, onExpandRow, isExpanded }) {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3 ">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={row.personalImageUrl || "avatar.jpg"}
                  alt={`Avatar of ${row.fullName}`}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{row.fullName}</div>
              <div className="text-sm opacity-50">{row.email}</div>
            </div>
          </div>
        </td>
        <td className="text-left">
          {row.trackName}
          <br />
          <span className="badge badge-ghost badge-sm text-nowrap text-center ">
            {row.branch}
          </span>
        </td>
        <td>
          {row.university}
          <br />
          <span className="badge badge-ghost badge-sm text-nowrap">
            {row.faculty}
          </span>
        </td>
        <th>
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => onExpandRow(row._id)}
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
                    <p>Mobile: {row.mobile}</p>
                    <p>Birth City: {row.cityOfBirthplace}</p>
                    <p>National ID: {row.nationalId || "N/A"}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Education</h3>
                    <p>Program: {row.program}</p>
                    <p>Intake: {row.intake}</p>
                    <p>Graduation: {row.graduationYearFromIti}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Professional</h3>
                    <p>Job Title: {row.fullJobTitle || "N/A"}</p>
                    <p>Company: {row.companyName || "N/A"}</p>
                    <p>Experience: {row.yearsOfExperience || 0} years</p>
                    <div className="mt-2">
                      <span className="badge badge-primary">
                        {row.workedAsFreelancerBefore ? "Freelancer" : "Full-time"}
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
