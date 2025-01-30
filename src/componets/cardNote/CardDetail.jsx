import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../utils";

function CardDetail({note})
{
    const {title,createdAt,body } = note;
    return (
        <>
            <p className="detail-page__title">{title}</p>
            <p className="detail-page__createdAt ">{showFormattedDate(createdAt)}</p>
            <p className="detail-page__body">{body}</p>
        </>

    )
}

CardDetail.propTypes = {    
    note: PropTypes.object.isRequired,
}

export default CardDetail;