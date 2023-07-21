import StateContext from "./stateContext";
import React, { useState } from 'react'

const Some_State = (props) => {
  const [loginusername, setloginusername] = useState("");

  const [login, setlogin] = useState(false);


  


  return (
    <StateContext.Provider value={{ login, setlogin}}>
      {props.children}
    </StateContext.Provider>
  )

}
export default Some_State