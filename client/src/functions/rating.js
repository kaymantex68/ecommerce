import React from 'react'
import StarRating from 'react-star-ratings'

export const ShowAverage = (p) => {

    if (p && p.ratings) {
        let ratingsArray = p && p.ratings
        let total = []
        let length = ratingsArray.length

        ratingsArray.map((r) => total.push(r.star))
        console.log('length', length)

        let totalReducer = total.reduce((p, n) => p + n, 0)
        console.log('totalReducer', totalReducer)

        let highest = length * 5
        console.log('highest', highest)

        let result = (totalReducer * 5) / highest
        console.log('result', result)


        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating starDimension="20px" starSpacing="2px" starRatedColor="red" rating={result} editing={false} />{" "}
                    ({p.ratings.length})
                </span>
            </div>
        )
    }
} 