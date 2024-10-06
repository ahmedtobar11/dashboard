import Button from "../ui/Button";

export default function TableRow({ row, onExpandRow, isExpanded }) {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={row.personalImageUrl} alt={`Avatar of ${row.name}`} />
              </div>
            </div>
            <div>
              <div className="font-bold">{row.name}</div>
              <div className="text-sm opacity-50">{row.email}</div>
            </div>
          </div>
        </td>
        <td>
          {row.track}
          <br />
          <span className="badge badge-ghost badge-sm text-nowrap">
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
            onClick={() => onExpandRow(row.id)}
            text="more details"
          />
        </th>
      </tr>
      {isExpanded && (
        <tr
          className="bg-base-200 relative
        "
        >
          <td colSpan="5">
            <button
              className="absolute top-1 right-1 w-8 h-8 rounded-full
             bg-main hover:bg-white text-white hover:text-main font-extrabold"
              onClick={() => onExpandRow(null)}
            >
              X
            </button>

            <div className="p-6 ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Personal Info</h3>
                    <p>Mobile: {row.mobile}</p>
                    <p>Birth City: {row.birthCity}</p>
                    <p>National ID: {row.nationalId}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Education</h3>
                    <p>Program: {row.program}</p>
                    <p>Intake: {row.intake}</p>
                    <p>Graduation: {row.graduationYear}</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                    <h3 className="card-title text-sm">Professional</h3>
                    <p>Job Title: {row.jobTitle}</p>
                    <p>Company: {row.companyName}</p>
                    <p>Experience: {row.experience} years</p>
                    <div className="mt-2">
                      <span className="badge badge-primary">
                        {row.freelancer === "Yes" ? "Freelancer" : "Full-time"}
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
