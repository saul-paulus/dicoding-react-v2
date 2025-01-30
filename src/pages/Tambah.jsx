import React from "react";
import PropTypes from "prop-types";
import FormInputNote from "@/componets/Input/FormInputNote";

function Tambah({onAddNote,title,onTitleChange,onBodyChange})
{
    return (
        <>
            <p className="title-tambah"><i className="bi bi-pencil-square"></i></p>
            <FormInputNote onAddNote={onAddNote} title={title} onTitleChange={onTitleChange} onBodyChange={onBodyChange}/>
        </>
    );
}

Tambah.propTypes = {
    onAddNote: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onBodyChange: PropTypes.func.isRequired
}

export default Tambah;