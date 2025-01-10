import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export default function Rooms() {
  const loaderRef = useRef();

  return (
    <div className="App">
      <div className="loader" ref={loaderRef}></div>
      <Form REF={loaderRef} />
    </div>
  );
}

function Form({ REF }) {
  const roomId = useSelector((state) => state.roomId);
  const sections = useSelector((state) => state.sections);
  const inputRef = useRef();
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  let navigate = useNavigate();
  const [text, setText] = useState("");
  let patchRoomId = useDispatch();
  
  async function handleClick(e) {
    e.preventDefault();
    if (text !== "") {
      patchRoomId({ type: "set", setValue: text });
      localStorage.setItem('roomId',text)
      REF.current.style.opacity = "1";
      await delay(1500);
      REF.current.style.opacity = "0";
      if (localStorage.getItem(text) !== null) {
        let parse = JSON.parse(localStorage.getItem(text));
        patchRoomId({ type: "setSections", setValue: parse });
        navigate(`/${text}`);
      } else {
        navigate("/CreateRoom");
      }
    }
  }
  return (
    <form action="" className="room">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setText(e.target.value);
          }
        }}
        placeholder="Enter Room Id"
      />
      <input type="submit" value={"Join / Create"} onClick={handleClick} />
    </form>
  );
}
