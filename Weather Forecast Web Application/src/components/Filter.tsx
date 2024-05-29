import React, { useState } from "react";

const Filter = ({handleFilter}) => {
  const [select, setSelect] = useState("");

  const [filterSelect, setFilterSelect] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const handleSelectChange = (e) => {
    // console.log("handle Select Change : ", e.target.value);
    if(e.target.value.includes("name", "cou_name_en")){
        // console.log("true")
        setFilterSelect(e.target.value.trim())
    }
  };

  const handleTextChange = (e) => {
    // console.log("handleFilterTextChange : ", e.target.value);
    setFilterInput(e.target.value.trim())
  };

  const handleButtonClick = (e) => {
    if(filterInput.length && filterSelect.length){
        handleFilter(filterSelect, filterInput, true)
        console.log("Inside button if inputs are not emptry")
        setFilterSelect("")
        setFilterInput("")
    }
  };


  return (
    <div className="w-full bg flex justify-end">
      <div className="w-2/4 lg:w-1/4 p-2">
        <h2 className="font-montserrat text-xl lg:text-2xl text-gray-600">
          Filter
        </h2>

        <div className="flex flex-col my-3">
          <label
            htmlFor="filterOption"
            className="px-2 font-montserrat font-gray-600 text-sm"
          >
            Choose Filter:{" "}
          </label>
          <select
            name="filterOption"
            id="filterOption"
            value={filterSelect}
            className="w-full bg-gray-400 ml-2 py-1 text-gray-200 font-medium px-2 focus:outline-gray-600"
            onChange={handleSelectChange}
          >
            <option className="text-gray-200 font-montserrat">
              Select One
            </option>
            <option value="name" className="font-montserrat text-white">
              City
            </option>
            <option value="cou_name_en" className="font-montserrat text-white">
              Country
            </option>
          </select>
        </div>

        <div className="my-4">
          <input
            type="text"
            value={filterInput}
            onChange={handleTextChange}
            className="ml-2 px-2 py-1 bg-gray-100 w-full text-gray-900 focus:outline-gray-300"
            placeholder="Enter any Character..."
          />
        </div>
        <div>
          <button
            type="button"
            className=" text-sm text-gray-600 lg:text-md font-medium bg-gray-100 px-6 py-1 border border-green-500 uppercase hover:bg-green-100 hover:text-green-500 hover:border-green-300 shadow"
            onClick={handleButtonClick}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
