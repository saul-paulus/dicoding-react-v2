import React from "react";
import SearchNotes from "../componets/Input/SearchNotes";
import NoteItemList from "../componets/cardNote/NoteItemList";
import PropTypes from "prop-types";



class Beranda extends React.Component {
    render() {
        const { notes, keyboard, onKeyboardChange } = this.props;
        const notesFilter = notes.filter((note) => 
            note.title.toLowerCase().includes(keyboard.toLowerCase())
        );

        return (
            <>
                <SearchNotes keyboard={keyboard} onKeyboardChange={onKeyboardChange} />
                <NoteItemList notes={notesFilter.filter(note => !note.archived)} />
            </>
        );
    }
}

Beranda.propTypes = {
    notes: PropTypes.array.isRequired,
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired
};

export default Beranda;