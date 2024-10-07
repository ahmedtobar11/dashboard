import React, { useEffect, useState } from "react";
import SelectComponent from "../ui/SelectComponent";
import tracksApiRequest from "../../services/apiRequests/tracksApiRequest";

function Filters() {
  const [tracks, setTracks] = useState([]);
  //const [branchesData, setBranchesData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const tracks = await tracksApiRequest.getAllTracks();
      setTracks(tracks);

      // const branches = await branchesApiRequest.getAllBranches();
      // setBranches(branches); , etc...
    };

    fetchData();
  }, []);

  const track = Array.from(new Set(tracks?.map((track) => track?.name))).map(
    (name) => ({
      value: name,
      label: name,
    })
  );

  const prefrence = [
    { value: "Course", label: "Course" },
    { value: "Business", label: "Business" },
  ];
  const freelancer = [
    { value: "Freelance", label: "Freelance" },
    { value: "Not Freelance", label: "Not Freelance" },
  ];

  // const branch = Array.from(
  //   new Set(userData?.map((user) => user?.university))
  // ).map((university) => ({
  //   value: university,
  //   label: university,
  // }));

  const branch = [
    { value: "branch1", label: "branch1" },
    { value: "branch2", label: "branch2" },
  ];

  return (
    <div className="container max-w-screen-xl mx-auto  mt-5 ">
      <div className="container mx-auto flex justify-center mb-2 p-3">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full xl:max-w-[80%] p-2">
          <SelectComponent
            options={[{ value: "", label: "No Filter" }, ...track]}
            placeholder="Track"
            onChange={(option) => setSelectedValue(option.value)}
          />
          <SelectComponent
            options={[{ value: "", label: "No Filter" }, ...freelancer]}
            placeholder="Freelancer"
            onChange={(option) => setSelectedValue(option.value)}
          />
          <SelectComponent
            options={[{ value: "", label: "No Filter" }, ...prefrence]}
            placeholder="Prefrence"
            onChange={(option) => setSelectedValue(option.value)}
          />
          <SelectComponent
            options={[{ value: "", label: "No Filter" }, ...branch]}
            placeholder="Branch"
            // value={selectedFilters.branch}
            onChange={(option) => setSelectedValue(option.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
