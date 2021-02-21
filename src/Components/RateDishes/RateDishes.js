import React,{ useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsLink45Deg } from "react-icons/bs"

import "./RateDishes.css"

const RateDishes = () => {

    const [userAddedData, setUserAddedData] = useState([])
    const [username, setUsername] = useState("")
    const [pollData, setPollData] = useState([])
    const [votesLeft, setVotesLeft] = useState(3)
    const [userChoice, setUserChoice] = useState([])
    const [disabled, setDisabled] = useState([])

    //Retrieveing all the dishes data from localstorage
    useEffect(() => {
        let postData = []

        for(let i in localStorage) {
            if(i.startsWith('foodPost')) {
                postData.push(...JSON.parse(localStorage[i]))
                console.log(i)
            }
        }

        setUserAddedData(postData)
        setUsername(localStorage.getItem('username'))
    },[])

    //Retrieving the poll data if its stored in localstorage
    useEffect(() => {
        if(localStorage.getItem('pollData')) {
            setPollData(JSON.parse(localStorage.getItem('pollData')))

            let data = JSON.parse(localStorage.getItem('pollData'))
            let user = localStorage.getItem('username')
            let count = 3

            console.log(40,data)

            data.forEach(item => {
                for(let j in item) {
                    if(item[j].username === user) {
                        count--
                    }
                }
            })
            console.log(42, count)
            setVotesLeft(count)
        }

    },[])

    //Add vote button
    const handleAddVote = index => {
        if(votesLeft > 0) {
            let data = userAddedData[index]

            setPollData(prev => {
                return [
                    ...prev,
                    {
                        [data.dishName] : {
                        
                            username,
                            voteNumber: 4-votesLeft,
                            index
                        } 
                    }    
                ]
            })

            setVotesLeft(prev => prev-1)

            setUserChoice([...userChoice, {
                dish: data.dishName,
                vote: 4-votesLeft
            }])
            setDisabled([...disabled, index])

        } else {
            alert("Maximum 3 votes per user")
        }

    }

    //Storing user's choice in localstorage
    useEffect(() => {
        let user = localStorage.getItem('username')
        localStorage.setItem(user, JSON.stringify(userChoice))
    },[userChoice])

    useEffect(() => {
        localStorage.setItem('pollData',JSON.stringify(pollData))
    },[pollData])

    useEffect(() => {
        let data = JSON.parse(localStorage['pollData'])
        let user = localStorage.getItem('username')

        let currentUserData = [] 

        data.forEach(item => {
            for(let j in item) {
                console.log(104,item[j].username, user)
                if(item[j].username === user) {
                    setDisabled(prev => {
                        return [
                            ...prev,
                            item[j].index
                        ]
                    })
                    currentUserData.push({
                        dish: j,
                        vote: item[j].voteNumber
                    })
                }
            }
        })
        localStorage.setItem(user,JSON.stringify(currentUserData))

    },[pollData])

    return (
        <div className="rateDishes-root">
            <p>Rate Dishes</p>
            <div>
                { userAddedData.length > 0 ? 
                <div className="rateDishes-block">
                    {userAddedData.map((item, index) => {
                        return (
                            <div key={index} className='singleDish'>
                                <p>Name: <span>{item.dishName}</span></p>
                                <p>Cuisine: <span>{item.dishCuisine}</span></p>
                                <p>Image: <span>{item.dishImageUrl}</span></p>
                                <p>Added by: <span>{item.username}</span></p>
                                { !disabled.includes(index) && <button onClick={() => handleAddVote(index)}>Vote</button>}
                            </div>
                        )
                    })}
                </div>
                :
                <p>No data to participate in the poll</p>}
            </div>
            <Link to="/pollResults" className="resultsPage-link"><BsLink45Deg />Results Page</Link>
        </div>
    )
}

export default RateDishes;