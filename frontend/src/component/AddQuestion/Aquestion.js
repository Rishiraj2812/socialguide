import React, { useState } from 'react'
import Editor from "react-quill/lib/toolbar";
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css";
import "./index.css"
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'


function Aquestion() {
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
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false)
  

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const handleQuill = (value) => {
    setBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "" && body !== "") {
      setLoading(true)
      const bodyJSON = {
        title: title,
        body: body,
        tag: JSON.stringify(tags),
        user: user,
      };
      await axios.post("/api/question", bodyJSON)
        .then((res) => {
          console.log(res.data);
          alert("Question added successfully");
          setLoading(false)
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        });
    }
  }; 
  return (
    <div className='add-question' >
        <div className='add-question-container'>
        <div className='head-title'>
            <h1>Ask public question</h1>
            </div>
            <div className='question-container'>
              <div className='question-options'>
                <div className='question-option'>
                <div className='title'>
                    <h3>Title</h3>
                    <small>Be specific and imagine youre asking a question to another person</small>
                    <input value={title}
                    id='tittle'
                  onChange={(e) => setTitle(e.target.value)}
                   type='text'
                    placeholder='who to stay motivated ?'  />
                </div>
                </div>
                <div className='question-option'>
                <div className='title'>
                    <h3>Body</h3>
                    <small>Include all the information someone would need to answer your question</small>
                    <ReactQuill value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"/>
                </div>
                </div>
                <div className='question-option'>
                <div className='title'>
                    <h3>Tags</h3>
                    <small>Add up to 5 tags to describe what your question is about</small>
                    <TagsInput value={tags} onChange={setTags} name="fruits" placeHolder="press enter to add new tag" />
                </div>
                </div>
              </div>
            </div>
            <button disabled={loading} onClick={handleSubmit}  type='submit' className='button' >{ loading ? "adding question" : "Ask your question" }  </button>
        </div>
    </div>
  )
}

export default Aquestion