import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setUser } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import test from '../images/test.jpg'
import './LoginSignup.css'
const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    createUser()
  }
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
    }).catch((err) => alert("ERROR : Please Enter Valid Email And Password"))
  }
  return (
    <div className="main_login_signup">
      <h1 className="task_keeper">Task Keeper</h1>

      <div className="login_signup1">
        <div className="login_signup2">
          <>

            <form onSubmit={(e) => handleSubmit(e)} className="login_signup_form">
              <h1 className="login_signup_h1">
                Sign Up
              </h1>
              <div className="input">
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type='submit' className='login_signup_button'>Sign Up</button>
              <p>Already Have An Acount <Link to="/login" >Log In</Link> </p>
            </form>
          </>
          <img className="login_signup_img" src={test} alt="" />
        </div>
      </div >
    </div >
  )
}

export default Signup
