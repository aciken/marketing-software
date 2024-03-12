import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from "./LandingPage/LandingPage.jsx";
import {Login} from "./Login/Login.jsx";
import {Signup} from "./SignUp/Signup.jsx";

function App() {

  return (
<Router>
<Routes>
  
   <Route exact path="/" element={<LandingPage/>} />
   <Route exact path="/login" element={<Login/>} />
   <Route exact path="/signup" element={<Signup/>} />

</Routes>
</Router>
  )
}

export default App
