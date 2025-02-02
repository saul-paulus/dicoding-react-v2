import React from "react";
import CardDetail from "@/componets/cardNote/CardDetail";
import { getNotesById,postUnarchive, postArchive,deleteNote, getNotes } from "../utils/api";
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
            note: null,
            notes: null,
        };
    }

    async componentDidMount() {
        try{
            const note = await getNotesById(this.props.id);
            this.setState({note: note.data});
        }catch(error){
            console.error('Gagal mendapatkan notes:', error);
        }

    }

    onArchivedHandler = async(id)=> {
        try{
            if(this.state.note.archived){
                await postUnarchive(id);
            }else{
                await postArchive(id);
            }
            const updateNote = await getNotesById(id);
            this.setState({note: updateNote},()=>{
                window.history.back();
            });
        }catch(error){
            console.log('Error archive note : ', error);
        }
    }

    onDeleteHandler =  async(id)=>{
        
        try{
            await deleteNote(id);
            const {data} = getNotes();
            this.setState({notes: data},()=>{
                window.history.back();
            })
        }catch(error){
            console.log('Error delete note : ', error);
        }

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
