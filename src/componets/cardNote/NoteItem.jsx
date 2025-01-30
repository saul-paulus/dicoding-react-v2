import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../utils";
import BtnDetail from "../Button/BtnDetail";


function NoteItem({note})
{
    const {title,createdAt,body, id} = note;
    return (
        <div className="note-item">
            <h3 className="note-item__title">{title}</h3>
            <p className="note-item__date">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{body}</p>
            <BtnDetail id={id}/>
        </div>
    );
}


NoteItem.propTypes = {
    note: PropTypes.object.isRequired
}

export default NoteItem;