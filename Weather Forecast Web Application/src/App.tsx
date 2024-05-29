import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartingPage from './components/StartingPage'
import InfoPage from './components/InfoPage'
import MainPage from './components/MainPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartingPage/>}/>
          <Route path='/main' element={<MainPage/>}/>
          <Route path='/info/:gettingCityCoordinates' element={<InfoPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App