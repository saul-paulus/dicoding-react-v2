import React from "react";
import PropTypes from "prop-types";

function FormInputNote({ onAddNote, title, onTitleChange, onBodyChange }) {
    return (
        <form onSubmit={onAddNote}>
            <div className="add-new-page__input">
                <input 
                    type="text"
                    className="add-new-page__input__title" 
                    placeholder="Masukkan title note..."
                    name="title"
                    value={title}
                    onChange={onTitleChange}
                />           
                <div 
                    className="add-new-page__input__body" 
                    contentEditable
                    onInput={onBodyChange}
                    data-placeholder="Masukkan note..."
                    suppressContentEditableWarning={true} 
                >
                </div>
            </div>
            <div className="add-new-page__action">
                <button className="action" type="submit" title="Simpan">
                    <i className="bi bi-save2-fill"></i>
                </button>
            </div>
        </form>
    );
}

FormInputNote.propTypes = {
    onAddNote: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onBodyChange: PropTypes.func.isRequired
}

export default FormInputNote;
