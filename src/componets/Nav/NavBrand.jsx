import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NavBrand({titleOne, titleTwo})
{
    return (
        <h1><Link to="/" className="nabvarBrand"><p className="titleOne">{titleOne}</p><p className="titleTwo">{titleTwo}</p></Link></h1>
    );
}


NavBrand.propTypes = {
    titleOne: PropTypes.string.isRequired,
    titleTwo: PropTypes.string.isRequired
}


export default NavBrand;