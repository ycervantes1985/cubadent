import React, {  useEffect} from 'react';
import "../App.css";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo-cubadent.jpg'
import { useUser, UserProvider } from "../contexts/userContext";
import { useNavigate } from 'react-router-dom';
import logout from '../services/logout';



const Main = () => {

    const {user,setUser} = useUser();
    const navigate = useNavigate();

  const logOut = async() => {
    const {success} = await logout();
    navigate(`/`)
    if(success) setUser(null)    
    else window.alert("Error. No se pude desloguear")
}

useEffect(() => {
   console.log("El usuario", user)
}, [user]);

 


    return (      
     <div> 
        
       <nav className='nav-container'>
        <div className='logo'>
          <img className='remove-bg' src={logo} alt='logo cubadent'></img>
          <p>CUBADENT</p>
        </div>  
        {user ?                 
        <ul className='nav justify-content-end'>                  
          
          <li className='nav-item'>
            <Link className='nav-link' to={"/add-paciente"}>ADD PACIENTE</Link>          
          </li>
          <li className='nav-item'>            
            <Link className="nav-link" variant="success" onClick={logOut}>LOGOUT</Link>
          </li>          
        </ul> : <ul className='nav justify-content-end'>                  
          <li className='nav-item'>
            <Link className='nav-link' to={"/register"}>REGISTRO</Link>
          </li>
                 
        </ul> 
}
      </nav>            
        </div> 
    );
}

export default Main;
