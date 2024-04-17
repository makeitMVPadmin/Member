// import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import MainNavigation from "./components/Main-Navigation/MainNavigation";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
    <>
    <MainNavigation />
    <Home />
    </>
  );
}

export default App;
