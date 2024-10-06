import React from "react";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

function ExportButton({ data }) {
  const handleExport = function () {
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet, "Graduates-Sheet");
    XLSX.writeFile(workBook, "Graduates-Excel.xlsx");
  };

  return (
    <button onClick={handleExport} className="flex gap-2 text-main">
      <Download className="text-main" />
      Export excel sheet
    </button>
  );
}

export default ExportButton;
