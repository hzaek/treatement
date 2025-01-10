import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function CreateRoom() {
    let sections = useSelector(state => state)
    let patchSections = useDispatch()

  let navigate = useNavigate();
  const roomId = useSelector((state) => state.roomId);
  useEffect(() => {
    if (roomId === null) {
      navigate("/rooms");
    }
  }, [roomId, navigate]);

  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  function handleAdd(e) {
    e.preventDefault();
    if (text === "") {
      return;
    }

    setList([{ name: text,list: [] },...list]);
    setText("");
  }
  return (
    <>
      <div className="App">
        <h1
          style={{
            color: "white",
            fontSize: "20px",
            padding: "0px 30px",
            textAlign: "center",
            margin: "0px 0px 20px 0px",
          }}
        >
          It Seems Like Room Number {roomId} is New To Create One do At least
          one List
        </h1>
        <form className="room">
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              style={{ border: "2px solid black", boxSizing: "border-box" }}
            />
            <input type="submit" value={"Add"} onClick={handleAdd} />
          </div>
          <ul className="listsContainer">
            {list.map(function (el, index) {
              return (
                <li
                  key={index}
                  style={{
                    padding: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    overflow: "auto",
                    maxWidth: "220px",
                    gap: "5px",
                  }}
                >
                  {el.name}{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let copy = [...list];
                      copy.splice(index, index + 1);
                      setList(copy);
                    }}
                    style={{
                      background: "black",
                      color: "white",
                      outline: "none",
                      border: "none",
                      padding: "5px",
                      width: "40px",
                    }}
                  >
                    del
                  </button>
                </li>
              );
            })}
          </ul>
          <input
            type="button"
            value={"Done"}
            disabled={list.length >= 1 ? false : true}
            style={{}}
            onClick={function(){
                let section = JSON.stringify(list)
                localStorage.setItem(roomId,section)
                patchSections({type: 'setSections',setValue: list})
                navigate(`/${roomId}`)
            }}
          />
        </form>
      </div>
    </>
  );
}
