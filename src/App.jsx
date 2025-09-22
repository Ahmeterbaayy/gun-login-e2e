import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/Success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
// commit için değişiklik
// hatalar kontrol edildi
// proje hazırlandı