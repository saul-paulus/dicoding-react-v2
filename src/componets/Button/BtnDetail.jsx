import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BtnDetail({id})
{
    return (
        <div className="detail">
            <Link className="btn-detail" to={`/note/idNote/${id}`}>Detail</Link>
        </div>
    );
}

BtnDetail.propTypes = {
    id: PropTypes.string.isRequired,
}

export default BtnDetail;