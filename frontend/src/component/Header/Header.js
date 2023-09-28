import React from 'react'
import Logo from './12.png'
import "./css/Header.css";
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {  useHistory } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
// import { signOut } from 'firebase/auth';

function Header() {
  const user = useSelector(selectUser);
  const history = useHistory()


  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
          <Link to = {'/'} > 
          <img src={Logo} style={{ width: 220, height: 100 }} alt='LOGO' />
           </Link>
          
        </div>
        <div className='header-middle'>

          <div className='header-search-container'>
            <SearchIcon/>
            <input type="text" id='search' placeholder="Search"/>
          </div>          
        </div>
        <div className='header-right'>
           <div className='header-right-container'>
          
          <span onClick = {() => {
          auth.signOut()
          history.push('/auth')}}><Avatar  sx={{ width: 50, height: 50 }} src={user?.photo}  /> </span> 
           <span style={{ marginLeft: 10 }} >{user?.displayName} </span>         
        </div>
        </div>
       
      </div>
    </header>
  )
}

export default Header