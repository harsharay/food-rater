import React, { useState, useEffect } from "react"

import "./PollResults.css"

const PollResults = () => {

    const [pollData, setPollData] = useState([])
    const [totalRatings, setTotalRatings] = useState([])

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('pollData'))
        setPollData(data)
    },[])

    useEffect(() => {

        let fullVotes = {}

        if(pollData.length > 0) {
            pollData.forEach(item => {
                for(let i in item) {
                    if(!fullVotes[i]) {
                        // fullVotes[i] = 1

                        if(item[i].voteNumber === 1) {
                            fullVotes[i] = 30
                        } else if(item[i].voteNumber === 2) {
                            fullVotes[i] = 20
                        } else if(item[i].voteNumber === 3) {
                            fullVotes[i] = 10
                        }

                    } else {
                        if(item[i].voteNumber === 1) {
                            fullVotes[i] += 30
                        } else if(item[i].voteNumber === 2) {
                            fullVotes[i] += 20
                        } else if(item[i].voteNumber === 3) {
                            fullVotes[i] += 10
                        }
                    }
                }
            })
        }

        // console.log(fullVotes)

        let finalOutput = []

        for(let j in fullVotes) {
            finalOutput.push({
                dishName: j,
                points: fullVotes[j]
            })
        }

        console.log(57, finalOutput)

        setTotalRatings(finalOutput)

    },[pollData])

    return (
        <div>
            <p>Results</p>
            <div>
                { totalRatings.length > 0  ?
                    totalRatings.map(ratings => {
                        return (
                            <div>
                                { ratings.dishName } : { ratings.points }
                            </div>
                        )
                    })
                :
                    <p>No data available</p>  
                }
            </div>
        </div>
    )
}

export default PollResults;