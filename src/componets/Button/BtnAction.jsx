import React from "react";
import PropTypes from "prop-types";

function BtnAction({ id, onArchived, onDelete, note }) {
    return (
        <div className="detail-page__action">
            <button className="action" type="button" title={note.archived ? "Aktifkan" : "Arsipkan"} onClick={() => onArchived(id)}>
                <i className={note.archived ? "bi bi-envelope-arrow-up-fill" : "bi bi-envelope-arrow-down-fill"}  ></i>
            </button>
            <button className="action" type="button" title="Hapus" onClick={()=> onDelete(id)}>
                <i className="bi bi-trash-fill"></i>
            </button>
        </div>
    );
}


BtnAction.propTypes = {
    id: PropTypes.string.isRequired,
    onArchived: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired
}


export default BtnAction;


