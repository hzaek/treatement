import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function CurrentRoom() {
  let roomId = useSelector((state) => state.roomId);
  let sections = useSelector((state) => state.sections);
  let dispatch = useDispatch();
  let sectionsRefs = useRef(new Map());
  let myMap = sectionsRefs.current;
  const [selected, setSelected] = useState(0);
  let list = sections[selected].list;
  const [text, setText] = useState("");
  useEffect(() => {
    sectionsRefs.current.get(0).click();
  }, []);
  function handleAdd() {
    if (text === "") {
      return;
    }
    let copy = [...list, text];
    dispatch({ type: "setList", selected: selected, setValue: copy });

    let strigify = JSON.stringify(sections);
    localStorage.setItem(roomId, strigify);
    setText("");
  }
  function handleSectionClick(index) {
    for (let [key, value] of myMap.entries()) {
      value.classList.remove("selected");
    }
    myMap.get(index).classList.add("selected");
    sectionsRefs.current.get(index);
    setSelected(index);
  }
  return (
    <>
      <div className="CurrentRoom">
        <ul className="sections">
          {sections.map(function (el, index) {
            return (
              <li
                ref={(node) => {
                  myMap.set(index, node);
                  return () => {
                    myMap.delete(index);
                  };
                }}
                key={index}
                onClick={() => {
                  handleSectionClick(index);
                }}
              >
                {el.name}
              </li>
            );
          })}
        </ul>
        <div style={{ padding: "30px" }}>
          <form className="room">
            <div style={{ display: "flex" }}>
              <input
                type="text"
                style={{
                  border: "2px solid black",
                  flex: "4",
                  height: "100%",
                  boxSizing: "border-box",
                }}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <input
                type="submit"
                value={"Add"}
                style={{ flex: "1", border: "2px solid black" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
              />
            </div>
            <ul className="listsContainer">
              {sections[selected].list.map(function (el, index) {
                return <li key={index}>{el}</li>;
              })}
            </ul>
          </form>

          <Timer></Timer>
        </div>
      </div>
    </>
  );
}

function Timer() {
  const [timeRemaining, setTimeRemaining] = useState({
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
    month: 0,
  });

  let expectedDate = useMemo(() => {
    const expectedDate = new Date("2025-07-09T13:28:40.385Z");
    return expectedDate
  },[]);

  useEffect(() => {
    const interval = setInterval(() => {
      let date = new Date();
      let second = (expectedDate - date) / 1000;
      let min = second / 60;
      let hour = min / 60;
      let day = hour / 24;
      let month = day / 30;

      setTimeRemaining({
        second: Math.floor(second % 60),
        minute: Math.floor(min % 60),
        hour: Math.floor(hour % 24),
        day: Math.floor(day % 30),
        month: Math.floor(month),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expectedDate]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };





  return (
    <div
      className="timer"
      style={{
        color: "white",
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      
      {`${formatTime(timeRemaining.month)} : ${formatTime(timeRemaining.day)} : ${formatTime(timeRemaining.hour)} : ${formatTime(timeRemaining.minute)} : ${formatTime(timeRemaining.second)} `}
    </div>
  );
}
