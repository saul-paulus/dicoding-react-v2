import React from "react";
import PropTypes from "prop-types";
import NavBrand from "../Nav/NavBrand";
import NavLink from "../Nav/NavLink";

function Navbar({onLogout,name}){    
    return(
        <>
            <NavBrand titleOne="dicoding" titleTwo="Notes"/>
            <NavLink  onAuthLogout={onLogout} name={name}/>
        </>
    );
}

Navbar.propTypes = {
    name: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}


export default Navbar;