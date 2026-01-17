import LandingPage  from "./pages/LandingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import  Navbar  from "./components/Navbar.jsx";
import  Footer  from "./components/Footer.jsx";
import  Queue  from "./components/queue/Queue.jsx";
import  CreateQueue  from "./components/CreateQueue.jsx";
import  Hub  from "./components/hub/hub.jsx";
import  Login  from "./pages/Login.jsx";
import  Signup  from "./pages/Signup.jsx";
import { AnimatePresence } from "framer-motion";
import  ScrollToTop  from "./components/utils/ScrollToTop.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname} >
            <Route path="/hub" element={<Hub />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="queue" element={<CreateQueue />} />
            <Route path="/queue/:queueId" element={<Queue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
