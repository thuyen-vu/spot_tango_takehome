import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { groupData } from "../utilities";
import { ChevronLeft, ChevronDown, X } from "lucide-react";

/* 
  Filter component for product page.
  Supports Category and Availability filtering.
  Responsive: shows as sidebar on desktop and slide-in menu on mobile.
*/

const Filter = ({
  isFilterBarOpen,
  setIsFilterBarOpen,
  selectedGroups,
  setSelectedGroups,
  selectedAvailability,
  setSelectedAvailability,
}) => {
  // Track which filter sections are expanded
  const [expandedFilterGroups, setExpandedFilterGroups] = useState({
    Category: false,
    Availability: false,
  });

  // Reusable Tailwind classes
  const filterClass = "pb-3 mb-3 lg:border-b lg:border-gray-200 text-gray-500";
  const filterButtonClass =
    "w-full flex justify-between items-center hover:underline decoration-1 underline-offset-6 transition-all";

  // Collapse filter group sections when route changes
  const location = useLocation();
  useEffect(() => {
    setExpandedFilterGroups({
      Category: false,
      Availability: false,
    });
  }, [location.pathname]);

  // Toggle visibility of a filter group
  const toggleFilterGroup = (fg) => {
    setExpandedFilterGroups({
      ...expandedFilterGroups,
      [fg]: !expandedFilterGroups[fg],
    });
  };

  // Toggle selection of a category checkbox
  const handleCheckboxChange = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter((g) => g !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  // Shared filter UI elements for both desktop and mobile
  const sharedFilterElements = (
    <>
      {/* Category Filter Section (Laptops, Tablets, Mobile, Accessories) */}
      <div className={filterClass}>
        <button
          className={filterButtonClass}
          onClick={() => toggleFilterGroup("Category")}
        >
          <div className="flex">
            Category

            {/* Show number of selected categories */}
            {selectedGroups.length > 0 && (
              <p className="ml-1">({selectedGroups.length})</p>
            )}
          </div>
          {expandedFilterGroups["Category"] ? (
            <ChevronDown size={15} className="text-gray-500" />
          ) : (
            <ChevronLeft size={15} className="text-gray-500" />
          )}
        </button>

        {/* List of category checkboxes */}
        {expandedFilterGroups["Category"] && (
          <div className="mt-5 space-y-2">
            {Object.keys(groupData).map((group) => (
              <div
                key={group}
                className="flex items-center space-x-2"
                onClick={() => handleCheckboxChange(group)}
              >
                <input
                  type="checkbox"
                  name="group"
                  value={group}
                  checked={selectedGroups.includes(group)}
                  onChange={() => handleCheckboxChange(group)}
                />
                <label>{groupData[group].label}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter Section */}
      <div className={filterClass}>
        <button
          className={filterButtonClass}
          onClick={() => toggleFilterGroup("Availability")}
        >
          <p>Availability {selectedAvailability !== "" && "(1)"}</p>
          {expandedFilterGroups["Availability"] ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>

        {/* List of availability checkboxes */}
        {expandedFilterGroups["Availability"] && (
          <div className="mt-5 space-y-2">
            {["Available", "Unavailable"].map((status) => (
              <div
                key={status}
                className="flex items-center space-x-2"
                onClick={() =>
                  setSelectedAvailability(
                    selectedAvailability === status ? "" : status
                  )
                }
              >
                <input
                  type="checkbox"
                  checked={selectedAvailability === status}
                  onChange={() =>
                    setSelectedAvailability(
                      selectedAvailability === status ? "" : status
                    )
                  }
                />
                <label>
                  {status === "Available" ? "Available" : "Sold Out"}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  return (
    <>
      {/* Mobile Filter Sidebar */}
      <div className="lg:hidden">

        {/* Semi-transparent overlay behind sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black transition-opacity ${
            isFilterBarOpen
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsFilterBarOpen(false)}
        />

        {/* Sliding sidebar menu */}
        <div
          className={`fixed right-0 top-0 h-full w-110 bg-white z-50 transform transition-transform duration-300 ${
            isFilterBarOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
        >
          {/* Header w close button */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200 mb-7">
            <h2 className="text-lg font-semibold ml-44">Filter</h2>
            <button onClick={() => setIsFilterBarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Filter options */}
          <div className="flex-1 overflow-y-auto px-10">
            {sharedFilterElements}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-200">
            <button
              onClick={() => setIsFilterBarOpen(false)}
              className="cursor-pointer justify-center flex items-center w-full bg-black text-white py-2 rounded-full hover:bg-gray-900"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>

        {/* Desktop Product Filter */}
        <aside className={`hidden lg:flex flex-col lg:w-1/4 mr-8 `}>
          <p className={filterClass}>Filter:</p>
          {sharedFilterElements}
        </aside>
    </>
  );
};

export default Filter;
