import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./routes/Home";
import Admission from "./routes/Admission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admision" element={<Admission />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
