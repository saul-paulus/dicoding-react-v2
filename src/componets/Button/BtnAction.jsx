import React from "react";

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

export default BtnAction;


