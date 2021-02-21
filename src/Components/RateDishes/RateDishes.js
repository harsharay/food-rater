import React,{ useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsLink45Deg } from "react-icons/bs"
import EditPopup from "../EditPopup/EditPopup"

import "./RateDishes.css"

const RateDishes = () => {

    const [userAddedData, setUserAddedData] = useState([])
    const [username, setUsername] = useState("")
    const [pollData, setPollData] = useState([])
    const [votesLeft, setVotesLeft] = useState(3)
    const [userChoice, setUserChoice] = useState([])
    const [disabled, setDisabled] = useState([])
    const [showEditPopup, setShowEditPopup] = useState(false)
    const [showEditButton, setShowEditButton] = useState(false)

    //Retrieveing all the dishes data from localstorage
    useEffect(() => {
        let user = localStorage.getItem('username')
        if(user) {
            setUsername(localStorage.getItem('username'))
        }
        
        if(localStorage.getItem('foodPost')) {
            let postData = JSON.parse(localStorage.getItem('foodPost'))
            setUserAddedData(postData)
        }


        if(!localStorage.getItem(user+'selectedIndices')) {
            localStorage.setItem(user+'selectedIndices',JSON.stringify([]))
        } else {
            let selectedIndicesFromStorage = JSON.parse(localStorage.getItem(user+'selectedIndices'))
            setDisabled(selectedIndicesFromStorage)
        }
    },[])

    useEffect(() => {
        let user = localStorage.getItem('username')
        let userChoiceFromStorage = JSON.parse(localStorage.getItem(user+'selectedIndices'))

        if(userChoiceFromStorage.length > 0) {
            setShowEditButton(true)
        } else {
            setShowEditButton(false)
        }

        setVotesLeft(3-userChoiceFromStorage.length)
        // console.log(49, 3-userChoiceFromStorage.length)
    },[disabled])

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
        let user = localStorage.getItem('username')
        if(votesLeft > 0) {
            let data = userAddedData[index]

            setPollData(prev => {
                return [
                    ...prev,
                    {
                        dishName: data.dishName,
                        username,
                        voteNumber: 4-votesLeft,
                        // index
                    }  
                ]
            })

            setVotesLeft(prev => prev-1)

            setUserChoice([...userChoice, {
                dish: data.dishName,
                vote: 4-votesLeft
            }])
            setDisabled([...disabled, index])

            if(localStorage.getItem(user+'selectedIndices')) {
                let selectedIndicesFromStorage = JSON.parse(localStorage.getItem(user+'selectedIndices'))

                selectedIndicesFromStorage.push(index)

                localStorage.setItem(user+'selectedIndices', JSON.stringify(selectedIndicesFromStorage))
            }

        } else {
            alert("Maximum 3 votes per user")
        }
    }

    useEffect(() => {
        localStorage.setItem('pollData',JSON.stringify(pollData))
    },[pollData])

    // useEffect(() => {
    //     let data = JSON.parse(localStorage['pollData'])
    //     let user = localStorage.getItem('username')

    //     let currentUserData = [] 
    
    // },[pollData])

    const handleEditChoices = () => {
        // let user = localStorage.getItem('username')

        // // let currentUserData = []

        // let dataFromStorage = JSON.parse(localStorage.getItem(user))
        setShowEditPopup(true)
        // console.log(132,dataFromStorage)
    }

    const handleClose = () => {
        setShowEditPopup(false)
    }

    return (
        <>
            { username ?
                <>
                    <div className="username">
                        <p>Logged in as <span>{username}</span></p>
                    </div>
                    <div className={"rateDishes-root " + (showEditPopup ? "grayBackground" : "") }>
                        <p>Rate Dishes</p>
                        <div>
                            { userAddedData.length > 0 ? 
                            <>
                                {showEditButton ? <button className="editMyChoices" onClick={handleEditChoices}>Edit my choices</button> : <p>Select atleast an option to edit your choices</p>}
                                <div className="rateDishes-block">
                                    {userAddedData.map((item, index) => {
                                        return (
                                            <div key={index} className='singleDish'>
                                                <p>Name: <span>{item.dishName}</span></p>
                                                <p>Cuisine: <span>{item.dishCuisine}</span></p>
                                                <p>Image: <span>{item.dishImageUrl}</span></p>
                                                <p>Added by: <span>{item.username}</span></p>
                                                { (!disabled.includes(index) && !showEditPopup) && <button onClick={() => handleAddVote(index)}>Vote</button>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                            :
                            <p>No data to participate in the poll</p>}
                        </div>
                        <Link to="/results" className="resultsPage-link"><BsLink45Deg />Results Page</Link>
                    </div>
                    { showEditPopup && 
                        <div className="editPopup">
                            <p onClick={handleClose} className="editPopupClose">Close</p>
                            <EditPopup />
                        </div> 
                    }
                </>
                :  
                <p>Please <Link to="/">Login</Link></p>
            }
        </>
    )
}

export default RateDishes;