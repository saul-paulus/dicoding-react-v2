import React from "react";
import {Link } from "react-router-dom";
import PropTypes from "prop-types";


function NavLink({onAuthLogout,name})
{

    return (
        <div className="navigation">
            <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/tambah">Tambah</Link></li>
                <li><Link to="/arsip">Arsip</Link></li>
                <li><button className="button-logout" onClick={onAuthLogout}>{name}<i className="bi bi-box-arrow-right"></i></button></li>
            </ul>
        </div>
    );
}

NavLink.propTypes = {
    onAuthLogout: PropTypes.func.isRequired
}

export default NavLink;