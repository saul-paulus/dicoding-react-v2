import React from "react";
import PropTypes from "prop-types";

function SearchNotes({keyboard,onKeyboardChange})
{
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Cari judul notes....." 
                value={keyboard}
                onChange={onKeyboardChange}
            />
        </div>
    );
}

SearchNotes.propTypes = {
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired
}

export default SearchNotes;