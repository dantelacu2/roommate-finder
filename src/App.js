import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./Components/SignupPage";
import MatchesPage from "./Components/MatchesPage";
import PreviousMatchesPage from "./Components/PreviousMatchesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import * as Realm from "realm-web";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="prev" element={<PreviousMatchesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
