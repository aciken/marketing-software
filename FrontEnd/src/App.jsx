import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from "./LandingPage/LandingPage.jsx";
import {Login} from "./Login/Login.jsx";
import {Signup} from "./SignUp/Signup.jsx";
import {Main} from "./Main/Main.jsx";
import {MainSettings} from "./Main/MainSettings.jsx";
import {MainDashboard} from "./Main/MainDashboard.jsx";
import { MainAffiliate } from "./Main/MainAffiliate.jsx";
import {AffiliatePage} from "./LinkPage/linkPage.jsx";
import {RedirectPage} from "./LinkPage/RedirectPage.jsx";
import {LinkPageNew} from "./LinkPage/LinkPageNew.jsx";
import {Affiliates} from "./Affiliate/Affiliates.jsx";




function App() {

  return (
<Router>
<Routes>
  
   <Route exact path="/" element={<LandingPage/>} />
   <Route exact path="/login" element={<Login/>} />
   <Route exact path="/signup" element={<Signup/>} />
   <Route exact path="/main" element={<Main/>} />
   <Route exact path="/main/settings" element={<MainSettings/>} />
   <Route exact path="/main/dashboard" element={<MainDashboard/>} />
   <Route exact path="/main/affiliate-links" element={<MainAffiliate/>} />
   <Route exact path="/main/affiliate-links/affiliates" element={<Affiliates/>} />
   <Route exact path="/:name/:id/:index" element={<LinkPageNew/>} />
    <Route exact path="/:name/:id/:index/:user" element={<RedirectPage/>} />

   

</Routes>
</Router>
  )
}

export default App
