import { Route, Routes } from "react-router";
// import RootLayout from "./components/custom/layout";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
    </Routes>
  );
};

export default App;
