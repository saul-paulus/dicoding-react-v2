import React from "react";
import SearchNotes from "../componets/Input/SearchNotes";
import NoteItemList from "../componets/cardNote/NoteItemList";
import { getAllNotes } from '@/utils/local-data'
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";


function BerandaPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyboard = searchParams.get('keyboard');

    function changeSearchParams(keyboard){
        setSearchParams({keyboard});
    }


    return <BerandaPage defaultKeyboard={keyboard} keyboardChange = {changeSearchParams} />
}


class BerandaPage extends React.Component 
{

    constructor(props){
        super(props);

        this.state = {
            notes: getAllNotes(),
            keyboard: props.defaultKeyboard || '',
        }

        this.onKeyboardChangeHandler = this.onKeyboardChangeHandler.bind(this);
    }

    onKeyboardChangeHandler(keyboard){
        this.setState(()=>{
            return {
                keyboard,
            }
        });
        
        this.props.keyboardChange(keyboard);
    }

    render() {
        const notes = this.state.notes.filter((note) => {
            return note.title.toLowerCase().includes(this.state.keyboard.toLowerCase());
        });

        return (
            <>
                <SearchNotes keyboard={this.state.keyboard} onKeyboardChange={this.onKeyboardChangeHandler} />
                <NoteItemList notes={notes.filter(note => !note.archived)} />
            </>
        );
    }
}
SearchNotes.propTypes = {
    keyboard: PropTypes.string.isRequired,
    onKeyboardChange: PropTypes.func.isRequired,
};

NoteItemList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BerandaPageWrapper;