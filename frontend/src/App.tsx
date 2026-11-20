import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Admission from "./routes/Admission";
import Calendar from "./routes/Calendar";
import Careers from "./routes/Careers";
import Characteristics from "./routes/Characteristics";
import Contact from "./routes/Contact";
import EnglishExam from "./routes/EnglishExam";
import Home from "./routes/Home";
import Infotep from "./routes/Infotep";
import NotFound from "./routes/NotFound";

// The router is provided by the caller: BrowserRouter in main.tsx,
// StaticRouter in entry-server.tsx (build-time prerender).
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/admision" element={<Admission />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/infotep" element={<Infotep />} />
        <Route path="/caracteristicas" element={<Characteristics />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/carreras" element={<Careers />} />
        <Route path="/examen-ingles" element={<EnglishExam />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
