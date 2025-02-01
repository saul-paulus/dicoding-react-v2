import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBrand({titleBrand})
{
    return (
        <h1><Link to="/">{titleBrand}</Link></h1>
    );
}


NavBrand.propTypes = {
    titleBrand: PropTypes.string.isRequired
}


export default NavBrand;