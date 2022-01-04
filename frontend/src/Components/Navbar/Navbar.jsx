import React, { useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../Images/blueLogo.png'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../StateContext/StateProvider";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Popper from "popper.js";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

//mabbar parent container
function Navbar({ fixed }) {
  const [{ user }] = useStateValue()
  return (
    <>
      {user ? (<AuthenticatedNavbar />) : (<UnAuthenticatedNavbar />)}
    </>
  );
}

const NavbarSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const setStuff = (e) =>{
    setLoading(true)
    setQuery(e.target.value)
    setMessage('')
  }

  return (
    <span className="bg-gray-200 p-2 rounded-md text-gray-400">
      <SearchRoundedIcon />
      <input
        onChange={setStuff} 
        type="text" 
        placeholder="Search For Medicine" 
        className="bg-transparent outline-none" 
        />
    </span>
  )
}

//navbar when user is unauthenticated
const UnAuthenticatedNavbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [{ basket }] = useStateValue()
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-1 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to='/'
            className="flex flex-row items-center font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-gray-700"
          >
            <img src={logo} alt="logo" className="w-16" />
            <p>laimant</p>
          </Link>
          <button
            className="text-gray-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <MenuIcon />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none items-center lg:ml-auto">
            <li className="nav-item">
              <NavbarSearch />
            </li>
            <li className="nav-item">
              <Link to='/checkout'
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
              >
                <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-gray-700 hover:text-gray-700">
                  <p role="button" className="relative flex">
                    <ShoppingCartOutlinedIcon fontSize="large" />
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-xs  leading-tight text-center">{basket?.length}
                    </span>
                  </p>
                </li>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/about'
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
              >
                <p>about</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/login'
                className="px-3 py-2 flex flex-row items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
              >
                <Avatar />
                <p>Login/Register</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


//navbar when user is authenticated
const AuthenticatedNavbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [{ user, basket }] = useStateValue()
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-1 navbar-expand-lg bg-white shadow">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link to='/'
            className="flex flex-row items-center font-bold leading-relaxed inline-block mr-4 whitespace-no-wrap uppercase text-gray-700"
          >
            <img src={logo} alt="logo" className="w-16" />
            <p>laimant</p>
          </Link>
          <button
            className="text-gray-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <MenuIcon />
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none items-center lg:ml-auto">
            <li className="nav-item">
              <NavbarSearch />
            </li>
            <li className="nav-item">
              <Link to='/checkout'
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
              >
                <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-gray-700 hover:text-gray-700">
                  <p role="button" className="relative flex">
                    <ShoppingCartOutlinedIcon fontSize="large" />
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-xs  leading-tight text-center">{basket?.length}
                    </span>
                  </p>
                </li>
              </Link>
            </li>
            <li className="nav-item">
              {JSON.parse(user).role === 'pharmacy' ? (<Link to='/dashboard'
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
              >
                <i className="text-lg leading-lg text-gray-700 opacity-75"></i><span className="ml-2">Dashboard</span>
              </Link>) : null}
            </li>
            <li className="nav-item">
              <span className="cursor-pointer">
                <Dropdown />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

//the cart icon


//user icon with drop down for account and logout
const Dropdown = ({ color }) => {
  const classes = useStyles();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const logout = (e) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload(false)
  }

  //setting user ro null on logout
  const [{ user },] = useStateValue()
  return (
    <>
      <div className="sticky top-0 z-100 bg-white flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <span
              className="p-1 flex items-center border border-gray-700 rounded-full text-gray-700 ml-1 hover:bg-gray-200"
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <Avatar className={classes.orange}>{JSON.parse(user).username.charAt(0)}</Avatar>
              <p>{JSON.parse(user).username}</p>
            </span>
            <div
              ref={popoverDropdownRef}
              className={(dropdownPopoverShow ? "block " : "hidden ") + "text-base z-100 border border-gray-700 mr-8 text-white list-none text-left rounded shadow-lg mt-1 bg-white text-gray-800"}
              style={{ minWidth: '8rem' }}
            >
              <div className="h-0 my-2 border flex align-center border-solid opacity-25 hover:bg-gray-600" />
              <span
                onClick={logout}
                className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap cursor-pointer"
              >
                <ExitToAppIcon />
              Logout
            </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar