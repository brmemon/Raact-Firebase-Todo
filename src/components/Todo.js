import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { EmptyMainTask, addItem, deleteItem, setMainTask, setUser, updateItem } from '../redux/todoSlice';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { onValue, ref, set } from 'firebase/database';
import './todo.css'

const Todo = () => {
  const [tittle, settittle] = useState("");
  const { mainTask } = useSelector((i) => i)
  const [index, setIndex] = useState(false);
  const [check, setCheck] = useState(false)
  const { user } = useSelector((i) => i)
  const dispatch = useDispatch()

  useEffect(() => {
    onValue(ref(db, user?.uid + "/mainTask"), async (data) => {
      dispatch(setMainTask(await data.val() ? data.val() : []))
    })
    setCheck(true)
  }, [])
  useEffect(() => {
    if (check)
      set(ref(db, user?.uid + "/"), { mainTask })
  }, [mainTask])
  const SubmitHandler = (i) => {
    i.preventDefault()
    let temp;
    if (tittle.trim() !== "")
      if (index || index !== false) {
        let obj = { index, value: tittle }
        dispatch(updateItem(obj))
        setIndex(false)
        settittle("")
      }
      else {
        dispatch(addItem(tittle))
        settittle("")
        console.log(mainTask)
      }
  }

  const deleteHandler = (i) => {
    dispatch(deleteItem(i))
  }

  const RemoveAllTask = () => {
    settittle("")
    let confirmed = window.confirm('Are you sure you want to remove all tasks?');
    if (confirmed) {
      dispatch(EmptyMainTask())
    }
  }

  let editHandler = (ind) => {
    let data = mainTask[ind];
    setIndex(ind)
    settittle(data)
  }
  const logOut = () => {
    signOut(auth)
    dispatch(setUser(false))
  }
  let renderTask = ('No Task Available')
  return (
    <>

      <div className="todo_logout">
        <h1 className="my_todo_app">
          Task Keeper 📜📜
        </h1>
        <button className="logout_button" onClick={logOut}>Sign Out</button>
      </div>

      <div className="main_div1">

        <form onSubmit={SubmitHandler}>

          <h1 className="Add_your_todos">Add Your Todos</h1>

          <input
            type='text'
            placeholder='Enter Task Here'
            value={tittle}
            onChange={(i) =>
              settittle(i.target.value)
            }>
          </input>
          <button className="Add_task_button">{index || index !== false ? `Update Task ${index + 1}` : "Add Task"}</button>
        </form>





        <ul>{
          (mainTask?.length == 0) ?
            <h2>{renderTask}</h2>
            :

            mainTask?.map((t, i) =>
              <>
                <div className="ul_main_div">
                  <li key={i}>{t}
                    <div>
                      <p>{t.tittle}</p>
                    </div>

                    <div className="li_buttons">
                      <button
                        className="li_btn"
                        disabled={index !== false}
                        onClick={() => {
                          deleteHandler(i)
                        }}>
                        ❌
                      </button>

                      <button
                        className="li_btn"
                        disabled={index !== false}
                        onClick={() => {
                          editHandler(i)
                        }}>
                        ✎✏
                      </button>
                    </div>

                  </li>
                </div>
              </>
            )
        }</ul>


        <button
          disabled={mainTask?.length == 0 || index !== false}
          onClick={() => {
            RemoveAllTask()
          }}
          className="all_task_btn">
          All Task ✖️
        </button>

      </div>
    </>

  )
}

export default Todo;