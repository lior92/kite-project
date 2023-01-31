import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login_page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  //error message
const [error_message,setErrorMessage] = useState('')


  //all users from store
  const users = useSelector((state) => state.usersSlice.users);
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(users.length!= 0){
      users.forEach((user) =>{
          if(user.name === name && user.password === password && password!=''&& name != ''){
            
            navigate(`/user_page/${user.name}`);
          }
          else{
              setErrorMessage(`Somthing went wrong`)
          }
      })  
    }
    else{
setErrorMessage(`user not found`)
    }
   };

  return (
    <div className="login_container">
      <div className="left_side">
        <h1>login <span>page</span> </h1>
        <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aut iure itaque consequuntur aliquid.</span> Eius earum, accusantium consequuntur laborum voluptatibus recusandae corrupti sequi soluta explicabo quasi veritatis necessitatibus perspiciatis mollitia.</p>
      </div>
      <div className="right_side">
      <h6>Login_page</h6>
      <p>hey there this is my kite project :)<br/>To keep connected with us login with your personal info</p>
      <p style={{color:'red'}}>{error_message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user_name">User name</label>
        <input onChange={(e)=>setName(e.target.value)} type="text" id="user_name" placeholder="user name.." />
        <label htmlFor="pass">Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type="text" id="pass" placeholder="password" />
        <div className="btn_container">
        <button variant="dark">Enter</button>  <button onClick={()=>navigate('/sign_up')}>register</button></div>
      </form>
      <div className="under_form"> 
 <div><input type="checkbox" /> Remember ME</div>
 <div><a href="#">Forgot your password</a></div>
 <div><a href="#">sign up</a></div>
 </div>
      </div>
    </div>
  );
};



export default Login_page;
