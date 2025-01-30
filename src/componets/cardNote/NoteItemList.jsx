import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteItemList({notes})
{
    if(notes.length == 0){
        return (
            <div className="notes-list-empty">
                <p>Tidak ada catatan</p>
            </div>
        );
    }else{
        return (
            <div className="notes-list">
                {
                    notes.map((note) =>(
                        <NoteItem 
                            key={note.id}
                            note={note}
                        />
                    ))
                }
            </div>        
        );
    }
}


NoteItemList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteItemList;