
import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import StateContext from "../context/some_State/stateContext"


export const HomeComp1 = () => {
    const check_admin = localStorage.getItem("admin");
    const statecontext = useContext(StateContext);
    const { login, setlogin } = statecontext;
    return (
        <div>

            {check_admin ? (
                <>
                    <Link to="/addjob">
                    <button type="button" class="btn btn-primary">Add Job Post</button>
                    </Link>
                    <h1> List of all Job</h1>
                </>
            ) : (
                <>
                    <h1> List of all Job</h1>
                </>
            )}
        </div>
    )
}
