import '../styles/sign_up.css'
import {getUsers} from '../features/usersSlice'
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup_page = () => {

//States
const [name,setName] = useState('')
const [last_name,setLastName] = useState('')
const [password,setPassword] = useState('')
const [conf_password,setConfPassword] = useState('')
//error message
const [error_message,setErrorMessage] = useState('')

//HOOKS
const dispatch = useDispatch()
const navigate = useNavigate()
//all users from store
const users = useSelector((state) => state.usersSlice.users);


const takeValues = (e) =>{
e.preventDefault();
if(users.some(user => user.name === name && user.last_name === last_name)){
alert('User already exists')
setName('')
setLastName('')
setPassword('')
setConfPassword('')
}
// else if(name==''||last_name==''||password==''||conf_password==''){
//   setErrorMessage('one of the required details is not correct')
// }
// else if(password!=conf_password){
//   setErrorMessage('passwords do not match')
// }
else{
//dispatch to store
dispatch(getUsers({name,last_name,password,conf_password}))
navigate('/')
}
}


  return (
<div className="sign_up_container">
<div>Sign up</div>
<p style={{color:'red'}}>{error_message}</p>
<form onSubmit={takeValues} >
<label htmlFor="user_name">User name</label>
<input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="user_name" placeholder="user name.." />
<label htmlFor="last_name">Last name</label>
<input value={last_name} onChange={(e)=>setLastName(e.target.value)} type="text" id="Last_name" placeholder="last name.." />
<label htmlFor="pass">Password</label>
<input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" id="pass" placeholder="password" />
<label htmlFor="con_pass">Confirm pass</label>
<input value={conf_password}  onChange={(e)=>setConfPassword(e.target.value)} type="text" id="con_pass" placeholder="confirm password" />
<button className="btn btn-primary" >
add
</button>
</form>
</div>
  )
}

export default Signup_page