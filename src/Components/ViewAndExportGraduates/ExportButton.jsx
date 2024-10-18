import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

function ExportButton({ fetchAllGraduatesForExport, filters }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async function () {
    setIsExporting(true);
    // Fetch all graduates for export
    let grads = await fetchAllGraduatesForExport(filters);
    let workBook = XLSX.utils.book_new();
    grads = grads.map((grad) => {
      grad.preferredCoursesToTeach = grad.preferredCoursesToTeach.join();
      grad.preferredTeachingBranches = grad.preferredTeachingBranches.join();
      return grad;
    });

    let workSheet = XLSX.utils.json_to_sheet(grads);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Graduates-Sheet");
    XLSX.writeFile(workBook, "Graduates-Excel.xlsx");

    setIsExporting(false);
  };

  return (
    <button onClick={handleExport} className="flex gap-2 text-main">
      <Download className="text-main" />
      {isExporting ? "Exporting..." : "Export excel sheet"}
    </button>
  );
}

export default ExportButton;
