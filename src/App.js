import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/containers/Home";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
