import Body from "./components/Body";
import { Routes, Route } from "react-router-dom";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/events/:eventId" element={<EventDetails />} />
    </Routes>
  );
}

export default App;
