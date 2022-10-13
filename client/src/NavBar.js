import { NavLink } from "react-router-dom"

function NavBar(){

    // function handleLinkClick(e) {
    //     e.preventDefault()
    //     onChangePage(e.target.pathname)
    // }

    return(
        <nav className="navbar">
            <NavLink exact to="/faceoff">Face Off  </NavLink>
            <NavLink exact to="/globalranks">  Global Rankings  </NavLink>
            <NavLink to="/userranks">  User Rankings</NavLink>
        </nav>
    )
}

export default NavBar;