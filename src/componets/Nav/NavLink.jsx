import React from "react";
import {Link } from "react-router-dom";
import PropTypes from "prop-types";


function NavLink({onAuthLogout})
{

    return (
        <div className="navigation">
            <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/tambah">Tambah</Link></li>
                <li><Link to="/arsip">Arsip</Link></li>
                <li><button className="button-logout" onClick={onAuthLogout}><i className="bi bi-box-arrow-right"></i></button></li>
            </ul>
        </div>
    );
}

export default NavLink;