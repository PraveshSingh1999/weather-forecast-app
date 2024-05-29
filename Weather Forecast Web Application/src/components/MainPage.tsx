import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import Table from './Table'
import Search from './Search'
import Filter from './Filter'


const MainPage = () => {

  const [toSearchCity, setToSearchCity] = useState("")
  const [filter, setFilter] = useState({option:"", input:"", flag:false})

  const handleToSearchCity = (cityName) => {
    setToSearchCity(cityName)
  }

  const handleFilter = (filterOptionData, filterInputData, flagValue) => {
    setFilter((prev) => ({ ...prev, option:filterOptionData, input:filterInputData, flag:flagValue}))
    console.log("inside handle Filter in main page", filterOptionData ,filterInputData, flagValue)
  }

  return (
    <>
        <Navbar/>
        <Search handleToSearchCity={handleToSearchCity}/>
        <Filter handleFilter={handleFilter}/>
        <Table toSearchCity={toSearchCity} filter={filter}/>
    </>
  )
}

export default MainPage