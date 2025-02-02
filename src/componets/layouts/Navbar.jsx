import React from "react";
import PropTypes from "prop-types";
import NavBrand from "../Nav/NavBrand";
import NavLink from "../Nav/NavLink";

function Navbar(){    
    return(
        <>
            <NavBrand titleOne="dicoding" titleTwo="Notes"/>
            <NavLink/>
        </>
    );
}

export default Navbar;