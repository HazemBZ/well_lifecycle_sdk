import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const ProductionDataTable = ({ data, isLoading }) => {
  const [editableCell, setEditableCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = () => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter data
  const getFilteredData = () => {
    if (!filter) return getSortedData();

    return getSortedData().filter((item) => {
      return Object.values(item).some((val) => 
        val.toString().toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  // Paginate data
  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  };

  // Handle cell edit start
  const handleEditStart = (rowIndex, column, value) => {
    setEditableCell({ rowIndex, column });
    setEditValue(value.toString());
  };

  // Handle cell edit change
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  // Handle cell edit save
  const handleEditSave = () => {
    // In a real application, this would update the data source
    console.log(`Saving ${editableCell.column} = ${editValue} for row ${editableCell.rowIndex}`);
    setEditableCell(null);
  };

  // Handle cell edit cancel
  const handleEditCancel = () => {
    setEditableCell(null);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Calculate total pages
  const totalPages = Math.ceil(getFilteredData().length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-neutral-900">Production Data</h2>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <h2 className="text-lg font-medium text-neutral-900">Production Data</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter data..."
              value={filter}
              onChange={handleFilterChange}
              className="pl-8 pr-3 py-1.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            <Icon
              name="Search"
              size={16}
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-neutral-400"
            />
          </div>
          <button
            className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            title="Add Row"
          >
            <Icon name="Plus" size={18} />
          </button>
          <button
            className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-md"
            title="Export Data"
          >
            <Icon name="Download" size={18} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig.key === "date" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("oil")}
              >
                <div className="flex items-center">
                  Oil (bbl/d)
                  {sortConfig.key === "oil" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("gas")}
              >
                <div className="flex items-center">
                  Gas (mcf/d)
                  {sortConfig.key === "gas" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("water")}
              >
                <div className="flex items-center">
                  Water (bbl/d)
                  {sortConfig.key === "water" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("pressure")}
              >
                <div className="flex items-center">
                  Pressure (psi)
                  {sortConfig.key === "pressure" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("gor")}
              >
                <div className="flex items-center">
                  GOR (mcf/bbl)
                  {sortConfig.key === "gor" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("wor")}
              >
                <div className="flex items-center">
                  WOR (bbl/bbl)
                  {sortConfig.key === "wor" && (
                    <Icon
                      name={sortConfig.direction === "ascending" ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="ml-1"
                    />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {getPaginatedData().map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {row.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {editableCell?.rowIndex === rowIndex && editableCell?.column === "oil" ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleEditChange}
                        className="block w-20 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="ml-2 text-success-500 hover:text-success-600"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="ml-1 text-error-500 hover:text-error-600"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded"
                      onClick={() => handleEditStart(rowIndex, "oil", row.oil)}
                    >
                      {row.oil}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {editableCell?.rowIndex === rowIndex && editableCell?.column === "gas" ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleEditChange}
                        className="block w-20 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="ml-2 text-success-500 hover:text-success-600"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="ml-1 text-error-500 hover:text-error-600"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded"
                      onClick={() => handleEditStart(rowIndex, "gas", row.gas)}
                    >
                      {row.gas}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {editableCell?.rowIndex === rowIndex && editableCell?.column === "water" ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleEditChange}
                        className="block w-20 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="ml-2 text-success-500 hover:text-success-600"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="ml-1 text-error-500 hover:text-error-600"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded"
                      onClick={() => handleEditStart(rowIndex, "water", row.water)}
                    >
                      {row.water}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {editableCell?.rowIndex === rowIndex && editableCell?.column === "pressure" ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleEditChange}
                        className="block w-20 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="ml-2 text-success-500 hover:text-success-600"
                      >
                        <Icon name="Check" size={16} />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="ml-1 text-error-500 hover:text-error-600"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded"
                      onClick={() => handleEditStart(rowIndex, "pressure", row.pressure)}
                    >
                      {row.pressure}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {row.gor.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                  {row.wor.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-primary-600 hover:text-primary-900 mr-2"
                    title="Add Note"
                  >
                    <Icon name="MessageSquare" size={16} />
                  </button>
                  <button
                    className="text-error-600 hover:text-error-900"
                    title="Delete Row"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-neutral-700">
              Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * rowsPerPage, getFilteredData().length)}
              </span>{" "}
              of <span className="font-medium">{getFilteredData().length}</span> results
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <select
                id="rowsPerPage"
                name="rowsPerPage"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="mr-4 block w-full pl-3 pr-10 py-1 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={25}>25 rows</option>
                <option value={50}>50 rows</option>
              </select>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">First</span>
                  <Icon name="ChevronsLeft" size={16} />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <Icon name="ChevronLeft" size={16} />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-primary-50 border-primary-500 text-primary-600" :"bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <Icon name="ChevronRight" size={16} />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Last</span>
                  <Icon name="ChevronsRight" size={16} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionDataTable;