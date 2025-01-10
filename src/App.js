import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Rooms from "./Componnents/Rooms";
import CreateRoom from "./Componnents/CreateRoom";
import CurrentRoom from "./Componnents/CurrentRoom";
function App() {
  const roomId = useSelector((state) => state.roomId);
  let patchRoomId = useDispatch();
  useEffect(() => {
    let text = localStorage.getItem("roomId")
    if (text !== null) {
      patchRoomId({ type: "set", setValue: text });
    }
    if (localStorage.getItem(text) !== null) {
      let parse = JSON.parse(localStorage.getItem(text));
      patchRoomId({ type: "setSections", setValue: parse });
      
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/Rooms"} replace />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/CreateRoom" element={<CreateRoom></CreateRoom>} />
          {roomId && <Route path={`/${roomId}`} element={<CurrentRoom />} />}
          <Route path="*" element={<h1>Page not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
