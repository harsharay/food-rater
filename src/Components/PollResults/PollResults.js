import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import "./PollResults.css"

const PollResults = () => {

    const [pollData, setPollData] = useState([])
    const [totalRatings, setTotalRatings] = useState([])
    const [currentUserChoice, setCurentUserChoice] = useState([])
    const [username, setUsername] = useState("")

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('pollData'))
        setPollData(data)
        console.log(14, data)

        let user = localStorage.getItem('username')
        if(user) {
            setUsername(user)
        }
    },[])

    useEffect(() => {
        let fullVotes = {}

        if(pollData.length > 0) {
            pollData.forEach(item => {
                if(!fullVotes[item.dishName]) {
                    if(item.voteNumber === 1) {
                        fullVotes[item.dishName] = 30
                    } else if(item.voteNumber === 2) {
                        fullVotes[item.dishName] = 20
                    } else if(item.voteNumber === 3) {
                        fullVotes[item.dishName] = 10
                    }
                } else {
                    if(item.voteNumber === 1) {
                        fullVotes[item.dishName] += 30
                    } else if(item.voteNumber === 2) {
                        fullVotes[item.dishName] += 20
                    } else if(item.voteNumber === 3) {
                        fullVotes[item.dishName] += 10
                    }
                }
            })
        }
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

    useEffect(() => {
        if(pollData.length > 0) {
            let user = localStorage.getItem('username')

            let userIndicesFromStorage = JSON.parse(localStorage.getItem(user+'selectedIndices'))

            console.log(62,userIndicesFromStorage)
            let foodPostDataFromStorage = JSON.parse(localStorage.getItem('foodPost'))
            let localNamesOfData = []

            foodPostDataFromStorage.forEach((item,arrayIndex) => {
                userIndicesFromStorage.forEach(indexItem => {
                    if(indexItem === arrayIndex) {
                        localNamesOfData.push(item.dishName)
                    }
                })
            })

            setCurentUserChoice(localNamesOfData)

        }
    },[pollData])

    return (
        <div className="pollResults-root">
            { username ?
                <>
                    <div className="username">
                        <p>Logged in as <span>{username}</span></p>
                    </div>
                    <div className="results-info">
                        <div className="redBackground">

                        </div>
                        <p>Items selected by you</p>
                    </div>
                    <p>Results</p>
                    <div className="pollResults-content">
                        { totalRatings.length > 0  ?
                            totalRatings.map((ratings, index) => {
                                return (
                                    <div key={index} className={"singleResult "+ (index < 3 ? "topThree" : "")}>
                                        <p className={"singleResultText "+(currentUserChoice.includes(ratings.dishName) ? "redColorClass" : "")}>{index<3 && index+1+". "}{ratings.dishName} : <span>{ratings.points}</span></p>
                                    </div>
                                )
                            })
                        :
                            <p>No data available</p>  
                        }
                    </div>
                </>
                :
                <p>Please <Link to="/">Login</Link></p>
            }
        </div>
    )
}

export default PollResults;