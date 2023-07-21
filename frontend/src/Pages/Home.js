import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import StateContext from "../context/some_State/stateContext"
import { HomeComp1 } from '../components/HomeComp1';


export const Home = () => {
    const statecontext = useContext(StateContext);
    const { login , setlogin} = statecontext;
    return (
        <div>
            
            { login ? (
                <>
                    <div className="my-3">
                        <p>login</p>
                        <HomeComp1 />
                    </div>
                </>
            ) : (
                <>
                    <div className="my-3">
                        <p>home Page</p>
                    </div>
                </>
            )}
        </div>
    )
}
