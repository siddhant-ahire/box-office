import React from 'react'
import {StyledActorCard} from './ActorCardStyled'

const ActorCard = ({id, name, country, birthday, deathday, gender, image}) => {
    
    return (
        <StyledActorCard key={id}>
            <div className="img-wrapper">
                <img src={image} alt="show"/>
            </div>
            <h1 >{name} {gender ? `(${gender})`: null}</h1>
            <p>{country ? `Comes from ${country}` : `No country known`}</p>
            {birthday ? <p>Born {birthday}</p> : null}
            <p className="deathday">{deathday ? `Died ${deathday}`: `Alive`}</p>
        </StyledActorCard>
    )
}

export default ActorCard

