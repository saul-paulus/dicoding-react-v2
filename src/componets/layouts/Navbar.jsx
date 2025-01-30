import React from "react";
import PropTypes from "prop-types";
import NavBrand from "../Nav/NavBrand";
import NavLink from "../Nav/NavLink";

function Navbar({titleBrand}){    
    return(
        <>
            <NavBrand titleBrand={titleBrand}/>
            <NavLink/>
        </>
    );
}

Navbar.propTypes = {
    Navbar: PropTypes.string
}

export default Navbar;