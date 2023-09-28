import React from 'react'
import "../Homepage/css/index.css"
import Sidebar from '../Homepage/Sidebar'
import Mainquestion from './Mainquestion';


function index() {
  return (
    <div className='stack-index' >
        <div className='stack-index-content'>
            <Sidebar/>
            <Mainquestion  />
        </div>
    </div>
  )
}

export default index