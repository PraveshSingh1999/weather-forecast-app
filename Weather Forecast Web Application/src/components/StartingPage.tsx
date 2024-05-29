import React from 'react'
import { Link } from 'react-router-dom'

const StartingPage = () => {
  return (
    <div className='bg-gray-200 min-h-screen flex justify-center items-center gap-y-8 shadow-2xl'>
        <div className='max-w-sm mx-auto bg-white rounded-lg flex flex-col items-center py-10'>
            <div className='w-8/12 h-8/12'>
                <img src="/images/logo.png" alt="logo" className='w-full h-full'/>
            </div>
            <div className='pt-6 px-4 flex flex-col items-center'>
                <h1 className='font-bold text-2xl uppercase text-center text-gray-700'>Welcome to Weather Forecast Application</h1>
                <p className='font-semibold text-gray-500 text-sm'>Developed by Pravesh Singh</p>

                <button className='mt-8 px-12 py-3 bg-blue-600 text-white text-lg font-medium uppercase shadow-lg rounded-md hover:bg-blue-800'>
                    <Link to="main">Click Here!</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default StartingPage