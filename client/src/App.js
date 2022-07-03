import "./App.css";
import { Routes, Route } from "react-router";

import Join from "./component/Join/Join";

import Chat from "./component/Chat/Chat";

function App() {
  return (
    <Routes>
      <Route exact path="/" component={Join} />
      <Route path="/chat" component={Chat} />
    </Routes>
  );
}

export default App;
