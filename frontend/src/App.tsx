import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Admission from "./routes/Admission";
import Contact from "./routes/Contact";
import Home from "./routes/Home";
import Infotep from "./routes/Infotep";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/admision" element={<Admission />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/infotep" element={<Infotep />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
