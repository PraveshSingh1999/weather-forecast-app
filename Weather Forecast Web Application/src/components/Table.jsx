import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";


const Table = ({ toSearchCity, filter }) => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [citySorting, setCitySorting] = useState(true);
  const [countrySorting, setCountrySorting] = useState(true);
  const [populationSorting, setPopulationSorting] = useState(true);

  const [sortingData, setSortingData] = useState({
    criteria: "",
    order: "",
    sort: false,
  });

  // console.log(data);
  // console.log("toSearchCity:", toSearchCity);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      // let api = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${page}`;

      let api = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?`;

      if (filter.flag) {
        api += `where=search(${filter.option}%2C%20%22${filter.input}%22)&`;
      }

      // Check if sorting is enabled
      if (sortingData.sort) {
        // Add sorting criteria to the API URL
        if (filter.flag) {
          console.log("inside filter condition")
          api += `where=search(${filter.option}%2C%20%22${filter.input}%22)&order_by=${sortingData.criteria}%20${sortingData.order}&`;
        } else {
          console.log("inside sorting condition")
          api += `order_by=${sortingData.criteria}%20${sortingData.order}&`;
        }
      }

      // Add limit and offset parameters
      api += `limit=20&offset=${page}`;

      console.log("api", api);

      if (toSearchCity) {
        api = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=search(name%2C%20%22${toSearchCity}%22)`;
        setPage(0); // Reset page to 0 when searching for a specific city
      }
      try {
        const res = await fetch(api);
        const returnData = await res.json();
        if (!ignore) {
          setData((prevData) => {
            if (page === 0 || toSearchCity) {
              return [...returnData.results]; // Reset data if page is 0
            } else {
              return [...prevData, ...returnData.results]; // Concatenate new data with existing data
            }
          });
        }
      } catch (error) {
        console.log("Error occurs while fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, toSearchCity, sortingData.sort, filter.flag]);


  useEffect(() => {
    // event listener to detect scrolling
    const handleScroll = () => {
      // console.log("handle scroll")
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);

    const debouncedHandleScroll = debounce(handleScroll, 500); // Debounce scroll event

    // useEffect hook's cleanup mechanism
    // In React, when you use useEffect, you might want to perform some cleanup when the component is
    // unmounted or before the effect is run again. In this case, you're adding an event listener to
    // the window object to detect scrolling. When the component is unmounted, you want to remove this
    // event listener to avoid potential memory leaks or unexpected behavior.
    // return () => window.removeEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [loading]); // Only re-run effect when loading state changes

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // const handleSorting = (value) => {
  //   if (value === "city") {
  //     setCitySorting((prev) => !prev);
  //     console.log(value);
  //   } else if (value.localeCompare("country") === 0) {
  //     setCountrySorting((prev) => !prev);
  //     console.log(value)
  //   } else if (value === "population") {
  //     setPopulationSorting((prev) => !prev);
  //     console.log(value)
  //   }
  // };

  const handleSorting = (value) => {
    if (value === "city") {
      setCitySorting((prev) => !prev);
      citySorting
        ? setSortingData({ criteria: "name", order: "ASC", sort: true })
        : setSortingData((prev) => ({ ...prev, sort: false }));
      // console.log("City sorting:", citySorting);
    } else if (value === "country") {
      setCountrySorting((prev) => !prev);
      countrySorting
        ? setSortingData({ criteria: "cou_name_en", order: "ASC", sort: true })
        : setSortingData((prev) => ({ ...prev, sort: false }));
      // console.log("Country sorting:", countrySorting);
    } else if (value === "population") {
      setPopulationSorting((prev) => !prev);
      populationSorting
        ? setSortingData({ criteria: "population", order: "DESC", sort: true })
        : setSortingData((prev) => ({ ...prev, sort: false }));
      // console.log("Population sorting:", populationSorting);
    }
  };

  return (
    <>
      <div className="mt-6 overflow-auto lg:w-full">
        <table className="border border-gray-400 w-full">
          <thead>
            <tr className="border-b-4 border-gray-500 bg-gray-700">
              <th className="tableHeading">
                City{" "}
                <span
                  className="text-sm lg:text-lg cursor-pointer px-1 font-light text-gray-400"
                  onClick={() => handleSorting("city")}
                >
                  <FontAwesomeIcon
                    icon={citySorting ? faAngleUp : faAngleDown}
                  />
                </span>{" "}
              </th>
              <th className="tableHeading">
                Country{" "}
                <span
                  className="text-sm lg:text-lg cursor-pointer px-1 font-light text-gray-400"
                  onClick={() => handleSorting("country")}
                >
                  <FontAwesomeIcon
                    icon={countrySorting ? faAngleUp : faAngleDown}
                  />
                </span>{" "}
              </th>
              <th className="tableHeading">Country Code</th>
              <th className="tableHeading">Timezone</th>
              <th className="tableHeading">
                Population{" "}
                <span
                  className="text-sm lg:text-lg cursor-pointer px-1 font-light text-gray-400"
                  onClick={() => handleSorting("population")}
                >
                  <FontAwesomeIcon
                    icon={populationSorting ? faAngleUp : faAngleDown}
                  />
                </span>
              </th>
              <th className="tableHeading">Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {data.length &&
              data.map((singleRow) => (
                <tr
                  key={singleRow.geoname_id}
                  className="text-center bg-gray-100 border-b border-gray-400"
                >
                  <td className="tableDefinition hover:bg-gray-300">
                    <Link to={`/info/${singleRow.coordinates.lat},${singleRow.coordinates.lon}, ${singleRow.timezone.split("/")}`} target="_self">
                      {singleRow.name}
                    </Link>
                  </td>
                  <td className="tableDefinition">{singleRow.cou_name_en}</td>
                  <td className="tableDefinition">{singleRow.country_code}</td>
                  <td className="tableDefinition">{singleRow.timezone}</td>
                  <td className="tableDefinition">{singleRow.population}</td>
                  <td className="tableDefinition">
                    {singleRow.coordinates.lat}, {singleRow.coordinates.lon}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="text-red-300 p-4 text-center font-montserrat">
            <FontAwesomeIcon
              icon={faSpinner}
              className="fa-spin-pulse text-4xl"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Table;

// If the content is not loading when scrolling quickly to the bottom,
// it might be due to the fact that the scroll event listener is not being
// triggered rapidly enough to keep up with the scrolling speed. This can
// cause some of the content not to load if the scroll event is missed.

// To address this issue, you can use a technique called "debouncing" or
// "throttling" to limit the frequency of scroll event triggers. Debouncing
// or throttling involves delaying the execution of a function until after a
// certain amount of time has passed since the last time the function was invoked.
