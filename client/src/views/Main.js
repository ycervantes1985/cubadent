import React from 'react';
import {useUser} from "../contexts/userContext"
import logout from '../services/logout';



const Main = () => {

    const {user,setUser} = useUser();

    const renderInfo=()=>{
        if(user){
            return (<>USUARIO LOGGUEADO: {user.firstName} {user.lastName} </>)
        }else{
            return(<>NO HAY USUARIO LOGGUEADO</>)
        }
    }

    const logOut = async() => {
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No se pude desloguear")
    }


    return (
        <div>
            main
            <h2>{renderInfo()} </h2>
            {user && <button onClick={logOut}>LOGOUT</button>}
            
        </div>
    );
}

export default Main;
