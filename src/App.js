import React from 'react'
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Todo from './components/Todo';
import Login from './components/Login';
import Signup from './components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/todoSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './Loader/loader';
const Page = () => {
  const dispatch = useDispatch()
  onAuthStateChanged(auth, (user) => {
    dispatch(setUser(user))
  })
  const location = window?.location.pathname
  const {user} = useSelector((i) => i)
  return (
    
    <Router>
      {
        user === "ok"?
        <Loader/>
        :
        <Routes>
          
          <Route path={'/'} element={user?<Todo />: <Navigate to={'/login'}/>} />
          <Route path={'/login'} element={user? <Navigate to={'/'} /> :<Login />} />
          <Route path={'/signUp'} element={user? <Navigate to={'/'} /> : <Signup />} />
          <Route path={location} element={user? <Navigate to={'/'} /> : <Navigate to={'/login'}/>} />
        </Routes>
}
    </Router>
  )
}

export default Page;