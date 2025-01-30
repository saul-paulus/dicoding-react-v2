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
    titleBrand: PropTypes.string.isRequired
}

export default Navbar;