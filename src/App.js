// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/HomePage/HomePage";
import CommunityManager from "./components/CommunityManager/CommunityManager";
import TempUi from './components/TempUi/TempUi'

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
    <>
      <TempUi />
      <CommunityManager />
    {/* <Home /> */}
    </>
  );
}

export default App;
