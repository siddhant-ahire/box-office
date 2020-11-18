import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { Star } from '../styled';
import {MainDataWrapper, Headline, TagList} from './ShowMainData.styled'

const ShowMainData = ({ name, rating, summary, tags, image }) => {
    return (
        <MainDataWrapper>
            <img src={image ? image.original : IMAGE_NOT_FOUND} alt="show-cover" />
            <div className="text-side">
                <Headline>
                    <h1>{name}</h1>
                    <div>
                        <Star/>
                        <span>{rating.average || 'N/A'}</span>
                    </div>
                </Headline>
                <div dangerouslySetInnerHTML={{__html: summary}}/>
                <Headline>
                    Tags:{' '}
                    <TagList>
                        {tags.map((tag, i)=>(
                            <span key={i}> {tag}</span>
                        ))}
                    </TagList>
                </Headline>
            </div>
        </MainDataWrapper>
    )
}

export default ShowMainData
