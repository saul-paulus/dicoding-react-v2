import React from "react";
import {Link } from "react-router-dom";

function NavLink()
{
    return (
        <div className="navigation">
            <ul>
                <li><Link to="/">Beranda</Link></li>
                <li><Link to="/note/tambah">Tambah</Link></li>
                <li><Link to="/note/arsip">Arsip</Link></li>
            </ul>
        </div>
    );
}

export default NavLink;