import React from 'react'
import {Link} from 'react-router-dom'
import {StyledShowCard} from './ShowCardStyled'

const ShowCard = ({id, name, image, summary}) => {

    const summaryAsText = summary
        ? `${summary.split(' ').slice(0,10).join(' ').replace(/<.+?>/g,'')}...`
        :`No description`;
    return (
        <StyledShowCard>
            <div className="img-wrapper">
                <img src={image} alt="show"/>
            </div>
            <h1>{name}</h1>
            <p>{summaryAsText}</p>
            <div>
                <Link to={`/show/${id}`}>Read More</Link>
                <button className="btns" type="button">Star Me</button>
            </div>
        </StyledShowCard>
    )
}

export default ShowCard
