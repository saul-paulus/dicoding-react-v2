import React from "react";
import NoteItemList from "@/componets/cardNote/NoteItemList";
import SearchNotes from "@/componets/Input/SearchNotes";
import PropTypes from "prop-types";

class Arsip extends React.Component {
    render() {
        const { notes, keyboard, onKeyboardChange } = this.props;
        const notesFilter = notes.filter((note) => 
            note.title.toLowerCase().includes((keyboard || "").toLowerCase())
        );

        return (
            <>
                <SearchNotes keyboard={keyboard} onKeyboardChange={onKeyboardChange} />
                <NoteItemList notes={notesFilter.filter(note => note.archived)} />
            </>
        );
    }
}

Arsip.propTypes = {
    notes: PropTypes.array.isRequired,
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired
};



export default Arsip;