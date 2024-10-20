import React, { memo, useMemo, useState } from "react";
import SelectComponent from "../../Components/ui/SelectComponent";
import { cities } from "../../utils/cities.json";
import { useAdminContext } from "../../contexts/AdminContext";
import Button from "../ui/Button";
import { X } from "lucide-react";

export const GraduatesFilterPanel = memo(({ filters, branches, onFilterChange, onReset, onApplySearch }) => {
  const { admin } = useAdminContext();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const branchOptions = useMemo(
    () => [
      { value: "", label: "All Branches" },
      ...branches.map((branch) => ({
        value: branch.name,
        label: branch.name,
      })),
    ],
    [branches]
  );

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [
      { value: "", label: "All Years" },
      ...Array.from({ length: 10 }, (_, i) => ({
        value: (currentYear - i).toString(),
        label: (currentYear - i).toString(),
      })),
    ];
  }, []);

  const cityOptions = useMemo(
    () => [
      { value: "", label: "All Cities" },
      ...cities.map((city) => ({
        value: city.value,
        label: city.label,
      })),
    ],
    []
  );

  const teachingOptions = useMemo(
    () => [
      { value: "", label: "All Interests" },
      { value: "Business sessions", label: "Business sessions only" },
      { value: "Courses", label: "Courses only" },
      { value: "Both", label: "Business sessions & Courses" },
    ],
    []
  );

  const filterOptions = [
    {
      key: "cityOfBirth",
      options: cityOptions,
      placeholder: "Select City of Birth",
      label: "City of Birth",
    },
    {
      key: "branch",
      options: branchOptions,
      placeholder: "Select Graduation Branch",
      label: "Graduation Branch",
    },
    {
      key: "itiGraduationYear",
      options: yearOptions,
      placeholder: "Select Graduation Year",
      label: "Graduation Year",
    },
    {
      key: "preferredTeachingBranches",
      options: branchOptions,
      placeholder: "Select Teaching Branch",
      label: "Preferred Teaching Branch",
    },
    {
      key: "interestedInTeaching",
      options: teachingOptions,
      placeholder: "Select Teaching Interest",
      label: "Interested in Teaching",
    },
  ].filter(({ key }) => admin.role === "super admin" || key !== "preferredTeachingBranches");

  const FilterContent = ({ isMobile = false }) => (
    <>
      {filterOptions.map(({ key, options, placeholder, label }) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="text-[11px] font-semibold text-gray-700 mb-1 block">
            {label}
          </label>
          <SelectComponent
            id={key}
            options={options}
            value={filters[key]}
            onChange={(option) => handleChange(key, option.value)}
            placeholder={placeholder}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            title={`Filter by ${label}`}
          />
        </div>
      ))}
      <Button
        text="Reset Filters"
        size="sm"
        onClick={() => {
          onReset();
          setIsFilterPanelOpen(false);
        }}
        className="w-full px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:border-transparent rounded-md transition-colors"
        variant="outline"
      />
    </>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <div className="flex items-center ">
        {/* Search by Full Name with dedicated search button */}
        <div className="relative w-full md:w-auto mb-4 md:mb-0 md:mr-4">
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="fullName"
              value={filters.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Search by name..."
              className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              title="Enter the graduate's full name"
            />
            <Button text="Search" size="sm" onClick={onApplySearch} className="px-4 py-2 hover:bg-gray-200 hover:border-red-700 border-2 rounded-md transition-colors" variant="fill" />
            {/* Filter button for small screens */}
            <div className="md:hidden ml-auto">
              <Button
                text="Filters"
                size="sm"
                onClick={() => setIsFilterPanelOpen(true)}
                className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                variant="outline"
              />
            </div>
          </div>

          {/* Filters for larger screens */}
          <div className="hidden md:flex gap-2 flex-wrap mt-5 justify-center ">
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Slide-out panel for small screens */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isFilterPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4">
          <button onClick={() => setIsFilterPanelOpen(false)} className="mb-4">
            <X size={24} />
          </button>
          <FilterContent />
        </div>
      </div>
    </div>
  );
});

export default GraduatesFilterPanel;
