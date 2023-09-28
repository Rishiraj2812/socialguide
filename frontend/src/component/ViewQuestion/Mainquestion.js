import { Avatar } from '@material-ui/core';
import { Bookmark, History } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import "./index.css";
import { Link } from 'react-router-dom';
import Editor from "react-quill/lib/toolbar";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Mainquestion() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  const user = useSelector(selectUser);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    async function getFunctionDetails() {
      await axios
        .get(`/api/question/${id}`)
        .then((res) => {
          console.log(res.data[0])
        setQuestionData(res.data[0])})
        .catch((err) => console.log(err));
    }
    getFunctionDetails();
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`/api/question/${id}`)
      .then((res) => setQuestionData(res.data[0]))
      .catch((err) => console.log(err));
  }
  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      user: user,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/answer", body, config)
      .then(() => {
        alert("Answer added successfully");
        setAnswer("");
        getUpdatedAnswer();
      })
      .catch((err) => console.log(err));
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      await axios.post(`/api/comment/${id}`, body).then((res) => {
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        // console.log(res.data);
      });
    }

    // setShow(true)
  };

  return (
    <div className='main' >
      <div className='main-container' >
      <div className='main-top' >
        <h2 className='main-question' >{questionData?.title} </h2>
        <Link to = '/add-question' ><button>Ask question</button> </Link>
      </div>
      <div className='main-desc' >
      <div className='info' >
        <p>{new Date (questionData?.created_at).toLocaleString()}</p>
        <p>Active<span>today</span></p>
        {/* <p>view<span>43 times</span></p> */}
      </div>
      </div>
           <div className='all-questions' >
            <div className='all-questions-container' >
              <div className='all-questions-left' >
              <div className='all-options' >
                {/* <p className='arrow' >▲</p>  
                <p className='arrow' >0</p>  
                <p className='arrow' >▼</p>  */}
                <Bookmark/>
                <History/>
              </div>  
              </div>
               <div className='question-answer' >
               <p>{ReactHtmlParser(questionData?.body)}</p>
               <div className='author' >
                <small>asked {new Date(questionData?.created_at).toLocaleString()}</small>
               
               <div className='auth-details' >
                <Avatar src={questionData?.user?.photo}
                 />
                <p>{questionData?.user?.displayName ? questionData?.user?.displayName : String (questionData?.user?.email).split('@')[0] }</p>
               </div>
               </div>
              <div className='comments' >
                   

                   <div className='comment' >
                          {questionData?.comments && questionData?.comments?.map((_qd)=> <p>{_qd?.comment} <span>{_qd?.user?.displayName ? _qd?.user?.displayName : String (_qd?.user?.email).split('@')[0] }</span> <small>{new Date(_qd?.created_at).toLocaleDateString()}</small> </p> )}

                   </div>
                    <p onClick={() => setShow(!show)} >Add a comment </p>
                    {
                      show  && (<div className='title'> 
                      <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type='text' placeholder="add your comment..." rows={4}    style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }} />  
                      <button 
                      onClick={handleComment}
                       style={{
                        maxWidth: "fit-content",
                      }} >Add comment</button>
                      </div>)
                    }
              </div>
            </div>
           </div>
           </div> 
           <div  style={{ flexDirection: "column",  }} className='all-questions'>
             <p
              style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
             fontWeight: "300", }} > no. of Answer {questionData?.answerDetails?.length }</p>
               {
                questionData?.answerDetails?.map((_q) => (  
              <div key = {_q?._id}  style={{borderBottom: "1px solid #eee", }} className='all-questions-container'>
             <div className='question-answer' >
               <p>{ReactHtmlParser(_q?.answer)}</p>
               <div className='author' >
                <small>asked {new Date(_q?.created_at).toLocaleString()}</small>
               
               <div className='auth-details' >
                <Avatar src={_q?.user?.photo} />
                <p>{_q?.user?.displayName ? _q?.user?.displayName : String (_q?.user?.email).split('@')[0] } </p>
               </div>
               </div>
            </div>
             </div> ))
               }

            
           </div>
      </div>
      <div className='main-answer'>
        <h3 style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }} >Your Answer</h3>
        <ReactQuill value={answer}
          onChange={handleQuill}
          className='react-quill'
          modules={Editor.modules}
          theme='snow' 
          style={{height:"200px",}} />
      </div>
        <button
         type='submit'
         onClick={handleSubmit}
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}>Post your answer</button>
    </div>
  );
}

export default Mainquestion