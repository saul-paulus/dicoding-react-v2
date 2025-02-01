import React from "react";
import CardDetail from "@/componets/cardNote/CardDetail";
import { getNote,isArchiveNote, getAllNotes, deleteNote } from "../utils/local-data";
import { useParams} from "react-router-dom";
import BtnAction from "@/componets/Button/BtnAction";
import PropTypes from "prop-types";

function DetailPage() {
    const { id } = useParams();
    return <DetailNote id={id}/>;   
}

class DetailNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: null
        };

        this.onArchivedHandler = this.onArchivedHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    componentDidMount() {
        const note = getNote(this.props.id);
        if (note) this.setState({note});
        
    }

    onArchivedHandler(id) {
        isArchiveNote(id);
        const updateNote = getNote(id);
        this.setState({note: updateNote},()=>{
            window.history.back();
        })
    }

    onDeleteHandler(id){
        deleteNote(id);
        window.history.back();
    }

    render() {
        const { note } = this.state;
        if (!note) {
            return (
                <div className="notes-list-empty">
                    <p>Tidak ada catatan</p>
                </div>
            );
        }else{
            return (
                <>
                    <div className="detail-page">
                        <CardDetail note={note} />
                    </div>
                    <BtnAction 
                        id={this.props.id} note={note} 
                        onArchived={this.onArchivedHandler} 
                        onDelete={this.onDeleteHandler} 
                    />
                </>
            );
        }
    }
}


DetailNote.propTypes = {
    id: PropTypes.string.isRequired,
};

CardDetail.propTypes = {
    note: PropTypes.object.isRequired,
};

BtnAction.propTypes = {
    id: PropTypes.string.isRequired,
    note: PropTypes.object.isRequired,
    onArchived: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};


export default DetailPage;
