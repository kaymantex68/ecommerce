import React from 'react'
import StarRatings from 'react-star-ratings'

const Start = ({ starClick, numberOfStars }) => {
    return (
        <>
            <StarRatings
                changeRating={() => starClick(numberOfStars)}
                numberOfStars={numberOfStars}
                starDimension="20px"
                starSpacing="2px"
                starHoverColor="red"
                starEmptyColor="red"
            />
            <br />
        </>
    )
}

export default Start