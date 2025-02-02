import React from "react";
import PropTypes from "prop-types";
import NavBrand from "../Nav/NavBrand";
import NavLink from "../Nav/NavLink";

function Navbar({onLogout}){    
    return(
        <>
            <NavBrand titleOne="dicoding" titleTwo="Notes"/>
            <NavLink  onAuthLogout={onLogout}/>
        </>
    );
}

Navbar.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired
}


export default Navbar;