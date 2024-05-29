import React, { useEffect, useState, useRef } from "react";

const Search = ({ handleToSearchCity }) => {
  const [cityName, setCityName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // const [inputValue, setInputValue] = useState(null);
  const [autoSuggestionBox, setAutoSuggestionBox] = useState(false);
  const inputRef = useRef();

  // console.log("suggestions state:", suggestions);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        if(!(cityName.trim().length === 0)){
          const response = await fetch(
            `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name&where=search(name%2C%20%22${cityName}%22)&limit=10`
          );
        const data = await response.json();
        // console.log("suggested city name data:", data.results);
        // console.log("inputRef.current.value: ", inputRef.current.value);
        // console.log("cityName: ", cityName);
        if (isMounted) setSuggestions(data.results);
        }
      } catch (error) {
        console.log("Error occurs while fetching data:", error);
      }
      // if(inputRef.current.value)
      //
    }

    fetchData();
    return () => {
      isMounted = false;
      console.log("unmounteed - done");
    };
  }, [cityName, setCityName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("in handle submit:", e.target)
    handleToSearchCity(inputRef.current.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    // setCityName(e.target.value)
    const { value } = e.target;

    inputRef.current.value = value; // Update inputValue state
    setCityName(value)// Update cityName state
    setAutoSuggestionBox(value.trim() !== "");
  };

  const handleClick = (value) => {
    // console.log("handleClick",value)
    inputRef.current.value = value;
    setAutoSuggestionBox((prev) => !prev);
  };

  // const handleValue = (e) => {
  //   console.log("handle Value:", e)
  // }

  return (
    <div className="py-6 mt-8">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col lg:flex-row gap-y-3 lg:gap-y-0 justify-center items-center"
      >
        <input
          type="text"
          // value={inputValue}
          ref={inputRef}
          onChange={handleChange}
          className="w-3/4 lg:w-2/4 px-2 py-2 text-lg  focus:outline-green-300 text-gray-600 font-montserrat bg-gray-300"
        />
        { <ul
             className={`${
               autoSuggestionBox ? "block" : "hidden"
             } absolute h-32 w-3/4 lg:w-2/4 z-10 bottom-0 top-12 lg:-translate-x-16 overflow-y-auto`}
           >
             {/* <li className="w-full border-b border-gray-800 px-3 py-1 bg-gray-900 text-white text-md hover:bg-gray-800 cursor-pointer">Noida</li>
             <li className="w-full border-b border-gray-800 px-3 py-1 bg-gray-900 text-white text-md hover:bg-gray-800 cursor-pointer">Haldwani</li> */}
             {suggestions.map((cName) => (
               <li
                 key={cName.geoname_id}
                 onClick={() => handleClick(cName.name)}
                 className="w-full border-b border-gray-800 px-3 py-1 bg-gray-900 text-white text-md hover:bg-gray-800 cursor-pointer"
               >
                 {cName.name}
               </li>
             ))}
           </ul>
        }
       

        <button
          type="submit"
          className="bg-green-500 px-6 py-2 text-lg font-medium uppercase text-white font-montserrat hover:bg-green-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
