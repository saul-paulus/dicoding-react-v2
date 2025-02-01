import React from "react";
import NoteItemList from "@/componets/cardNote/NoteItemList";
import SearchNotes from "@/componets/Input/SearchNotes";
import PropTypes from "prop-types";
import { getAllNotes } from "../utils/local-data";


class ArsipPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notes: getAllNotes(),
            keyboard: ""
        }

        this.onKeyboardChangeHandler = this.onKeyboardChangeHandler.bind(this);
    }

    onKeyboardChangeHandler(e){
        this.setState(()=>{
            return {
                keyboard: e.target.value
            }
        })     
    }


    render() {
        const notesFilter = this.state.notes.filter((note) => 
            note.title.toLowerCase().includes(this.state.keyboard.toLowerCase())
        );

        return (
            <>
                <SearchNotes keyboard={this.state.keyboard} onKeyboardChange={this.onKeyboardChangeHandler} />
                <NoteItemList notes={notesFilter.filter(note => note.archived)} />
            </>
        );
    }
}

SearchNotes.prototype = {
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired,
}

NoteItemList.prototype = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default ArsipPage;