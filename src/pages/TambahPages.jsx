import React from "react";
import { createNote, getNotes } from "../utils/api";
import PropTypes from "prop-types";
import FormInputNote from "@/componets/Input/FormInputNote";
import parser from 'html-react-parser';


class TambahPage extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            title:"",
            body:""
        }
    }

    onTitleChangeHandler = (e) =>{
        this.setState({title: e.target.value})
    }

    onBodyChangeHandler = (e) => {
        const content = e.target.innerHTML; 
        this.setState({
            body: parser(content),
        });
    }

    onAddNoteHandler = async (e) => {
        e.preventDefault();
        const {title, body} = this.state;

        await createNote({title,body});
        this.setState({
            notes:getNotes(),
            title:""
        },()=>{
            window.history.back();
        })
    }


    render(){
        return (
            <>
                <p className="title-tambah"><i className="bi bi-pencil-square"></i></p>
                <FormInputNote title={this.state.title} onAddNote={this.onAddNoteHandler}  onTitleChange={this.onTitleChangeHandler} onBodyChange={this.onBodyChangeHandler}/>
            </>
        );
    }  
}


FormInputNote.propTypes = {
    title: PropTypes.string.isRequired,
    onAddNote: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onBodyChange: PropTypes.func.isRequired
}

export default TambahPage;