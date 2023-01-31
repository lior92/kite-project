import "./App.css";
// import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from './components/Login_page';
import Signup_page from "./components/Signup_page";
import User_page from "./components/User_page";

function App() {




  return (
    <div className="App">

<Routes>      
  <Route path="/" element={<LoginPage/>}/>
  <Route path="/sign_up" element={<Signup_page/>}/>
  <Route path="/user_page/:user_name" element={<User_page/>}/>
</Routes>
    </div>
  );
}

export default App;
