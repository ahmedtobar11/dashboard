import React, { memo, useMemo } from "react";
import SelectComponent from "../../Components/ui/SelectComponent";
import { cities } from "../../utils/cities.json";
import { useAdminContext } from "../../contexts/AdminContext";
import Button from "../ui/Button";

export const GraduatesFilterPanel = memo(
  ({ filters, branches, onFilterChange, onReset, onApplySearch }) => {
    const { admin } = useAdminContext();

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

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Search by Full Name with dedicated search button */}
          <div className="relative xl:col-span-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Full Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="fullName"
                value={filters.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Search by name..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                title="Enter the graduate's full name"
              />

              <Button
                text="Search"
                size="sm"
                onClick={onApplySearch}
                className="px-4 py-2 hover:bg-gray-200 hover:border-red-700 border-2 rounded-md transition-colors"
                variant="fill"
              />
            </div>
          </div>

          {/* Drop-down Filters with immediate application */}
          {[
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
          ]
            .filter(
              ({ key }) =>
                admin.role === "super admin" ||
                key !== "preferredTeachingBranches"
            )
            .map(({ key, options, placeholder, label }) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
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
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-end mt-4">
          <Button
            text="Reset Filters"
            size="sm"
            onClick={onReset}
            className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
            variant="outline"
          />
        </div>
      </div>
    );
  }
);

export default GraduatesFilterPanel;
