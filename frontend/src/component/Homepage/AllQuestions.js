import { Avatar } from "@material-ui/core";
import React  from "react";
import "./css/AllQuestions.css";
import { Link } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'


function AllQuestions({questions}) {
//  console.log(questions?.tags[0]);
  let tags = JSON.parse(questions?.tags[0])

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // const tags = [];
  
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            {/* <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div> */}
            <div className="all-option">
              <p>{questions?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to = {`/question?q=${questions?._id}`} >{questions?.title}</Link>

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{ReactHtmlParser(truncate(questions?.body,200))}</div>
          </div>
          {/* {
            tags.map((_tag) => (<><div
            style={{
              display: "flex",
            }}
          >
              <span className="question-tags" >{_tag}</span>
           
          </div></>))
          } */}
              <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag) => (
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>{ new Date(questions?.created_at).toLocaleDateString()}</small>
            <div className="auth-details">
              <Avatar src = {questions?.user?.photo} />
              <p>
                {questions?.user?.displayName ? questions?.user?.displayName : String (questions?.user?.email).split('@')[0] }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
