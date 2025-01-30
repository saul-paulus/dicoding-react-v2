import React from "react";
import CardDetail from "@/componets/cardNote/CardDetail";
import { getNote } from "../utils/local-data";
import { useParams} from "react-router-dom";
import BtnAction from "@/componets/Button/BtnAction";
import PropTypes from "prop-types";

function DetailPage({onArchived,onDelete}) {
    const { id } = useParams();
    return <DetailNote id={id} onArchived={onArchived} onDelete={onDelete} />;   
}

class DetailNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            note: null
        };
    }

    componentDidMount() {
        const note = getNote(this.props.id);
        if (note) this.setState({note});
        
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
                    <BtnAction id={this.props.id} note={note} onArchived={this.props.onArchived} onDelete={this.props.onDelete} />
                </>
            );
        }
    }
}

DetailPage.propTypes = {
    onArchived: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

DetailNote.propTypes = {
    id: PropTypes.string.isRequired,
    onArchived: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default DetailPage;
