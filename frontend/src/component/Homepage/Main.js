import { FilterList } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import AllQuestions from './AllQuestions'
import "./css/Main.css"

function Main({questions}) {
  return (
    <div className='main' >
      <div className='main-container' >
        <div className='main-top' >
          <h2>All Questions</h2>
            <Link to={'/add-question'} > 
            <button type="button" >ask queston</button>
            </Link>
      </div>
      <div className='main-desc'>
        <p>question status {questions && questions.length} </p>
        <div className='main-filter' >
         {/* <div className='main-tabs' >
          <div className='main-tab' >
                    <Link>Newest</Link>
              </div>
                <div className='main-tab' >
                  <Link>Active</Link>
              </div>
                <div className='main-tab' >
                  <Link>more</Link>
              </div>
       </div> */}
       <div className='main-filter-item' >
                <FilterList/>
                <p>filters</p>
         </div>
     </div>      
          </div>
          <div className='questions' >
            { questions?.map((_q) => (
            <div className='question' >
          <AllQuestions questions={_q} />
           </div>
           ))}
        
           </div>
      </div>
    </div>
  )
}
export default Main;