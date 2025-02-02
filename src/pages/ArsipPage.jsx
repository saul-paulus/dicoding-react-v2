import React from "react";
import NoteItemList from "@/componets/cardNote/NoteItemList";
import SearchNotes from "@/componets/Input/SearchNotes";
import PropTypes from "prop-types";
import {getNoteArchive, getNotes} from "../utils/api";
import { useSearchParams } from "react-router-dom";



function ArsipPageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyboard = searchParams.get('keyboard');

    const changeSearchParams = (keyboard)=>{
        setSearchParams({keyboard});
    }


    return <ArsipPage defaultKeyboard={keyboard} keyboardChange={changeSearchParams}/>
}   


class ArsipPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            notes: [],
            keyboard: this.props.defaultKeyboard || "",
        }
    }

    async componentDidMount(){
        try{
            const { data } = await getNoteArchive();
            this.setState({notes: data});
        }catch(error){
            console.error('Gagal mendapatkan notes:', error);
        }
    }


    onKeyboardChangeHandler = (keyboard) =>{
        this.setState({keyboard},()=>{
            this.props.keyboardChange(keyboard);
        });
    }

    render() {
        const notes = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(this.state.keyboard.toLowerCase())
          );
      
        return (
            <>
                <SearchNotes 
                    keyboard={this.state.keyboard} 
                    onKeyboardChange={this.onKeyboardChangeHandler} 
                />
                <NoteItemList 
                    notes={notes} 
                />
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

export default ArsipPageWrapper;
