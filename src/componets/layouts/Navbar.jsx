import React from "react";

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

export default Navbar;