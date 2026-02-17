import React from 'react'
import ThreeModel from '../components/ThreeModel'
import Construct from '../components/Construct'

const Nothing = () => {
  return (
    <div className='h-screen w-full bg-gray-600 flex flex-col items-center justify-center'>
        <h3 className="text-white text-2xl">Nothing to see here yet</h3>
        <Construct />
    </div>
  )
}

export default Nothing