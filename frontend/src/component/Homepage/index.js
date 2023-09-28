import React, { useEffect, useState } from 'react'
import "./css/index.css"
import Sidebar from './Sidebar'
import Main from './Main';
import axios from 'axios';


function Index() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      await axios.get("/api/question").then((res) => {
        setQuestions(res.data.reverse());
        console.log(res.data)
      }).catch((err) => {
        alert(err)
        console.log("Error: " + err);
      });
    } 
    getQuestions();
  }, []);
  return (
    <div className='stack-index' >
        <div className='stack-index-content'>
            <Sidebar/>
            <Main questions = {questions} />
        </div>
    </div>
  )
}

export default Index;