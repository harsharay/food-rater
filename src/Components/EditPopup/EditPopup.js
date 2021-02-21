import React, { useState, useEffect } from "react"

import "./EditPopup.css"

const EditPopup = () => {

    const [foodPost, setFoodPost] = useState([])
    const [pollData, setPollData] = useState([])

    const [userChoice, setUserChoice] = useState([])
    // const [listData, setListData] = useState([])
    const [firstVote, setFirstVote] = useState("")
    const [secondVote, setSecondVote] = useState("")
    const [thirdVote, setThirdVote] = useState("")


    useEffect(() => {
        let foodPostFromStorage = JSON.parse(localStorage.getItem('foodPost'))
        setFoodPost(foodPostFromStorage)

        if(localStorage.getItem('pollData')) {
            let pollDataFromStorage = JSON.parse(localStorage.getItem('pollData'))
            setPollData(pollDataFromStorage)
        }
    },[])

    useEffect(() => {
        let user = localStorage.getItem('username')
        let localUserChoice = []
        // let localList = []

        if(pollData.length > 0) {
            pollData.forEach(item => {
                if(item.username === user) {
                    localUserChoice.push(item)
                    // localList.push(item.dishName)
                }
            })
        }

        localUserChoice.forEach((item, index) => {
            if(index === 0) {
                setFirstVote(item.dishName)
            } else if(index === 1) {
                setSecondVote(item.dishName)
            } else if(index === 2) {
                setThirdVote(item.dishName)
            }
        })

        setUserChoice(localUserChoice)
        // setListData(localList)
    },[pollData])

    const handleVoteChange = e => {
        let newValue = e.target.value
        let currentName = e.target.name

        if(currentName === 'firstVote') {
            setFirstVote(newValue)
        } else if(currentName === 'secondVote') {
            setSecondVote(newValue)
        } else {
            setThirdVote(newValue)
        }

        let pollDataFromStorage = JSON.parse(localStorage.getItem('pollData'))
        let user = localStorage.getItem('username')

        let foodDataFromStorage = JSON.parse(localStorage.getItem('foodPost'))
        let userSelectedIndices = JSON.parse(localStorage.getItem(user + 'selectedIndices'))
        
        let newIndex;

        foodDataFromStorage.forEach((item,itemIndex) => {
            if(item.dishName === newValue) {
                newIndex = itemIndex
            }
        })


        let indexToBeDeleted;

        pollDataFromStorage.forEach((item, itemIndex) => {
            if(currentName === 'firstVote' && (item.dishName === userChoice[0].dishName && item.username === user)) {
                console.log("First")
                indexToBeDeleted = itemIndex
            } else if(currentName === 'secondVote' && (item.dishName === userChoice[1].dishName && item.username === user)) {
                indexToBeDeleted = itemIndex
            } else if(currentName === 'thirdVote' && (item.dishName === userChoice[2].dishName && item.username === user)) {
                indexToBeDeleted = itemIndex
            }
        })

        let newVoteNumber;

        if(currentName === 'firstVote') {
            newVoteNumber = 1
        } else if(currentName === 'secondVote') {
            newVoteNumber = 2
        } else if(currentName === 'thirdVote') {
            newVoteNumber = 3
        }

        let newItemToBeAdded = {
            dishName: newValue,
            username: user,
            voteNumber: newVoteNumber,
        }

        if(currentName === 'firstVote' && (newValue !== secondVote && newValue !== thirdVote)) {
            pollDataFromStorage.splice(indexToBeDeleted, 1, newItemToBeAdded)
            userSelectedIndices[0] = newIndex

        } else if(currentName === 'secondVote' && (newValue !== firstVote && newValue !== thirdVote)) {
            pollDataFromStorage.splice(indexToBeDeleted, 1, newItemToBeAdded)
            userSelectedIndices[1] = newIndex

        } else if(currentName === 'thirdVote' && (newValue !== secondVote && newValue !== firstVote)) {
            pollDataFromStorage.splice(indexToBeDeleted, 1, newItemToBeAdded)
            userSelectedIndices[2] = newIndex
        } else {
            if(currentName === 'firstVote') {
                let previousValue = firstVote

                let previousIndex = userSelectedIndices[0]
                userSelectedIndices[0] = previousIndex

                setFirstVote(previousValue)
    
                alert("Cannot vote for the same item twice, change the option")
            } else if(currentName === 'secondVote') {
                let previousValue = secondVote

                let previousIndex = userSelectedIndices[1]
                userSelectedIndices[1] = previousIndex
                
                setSecondVote(previousValue)
                alert("Cannot vote for the same item twice, change the option")
            } else if(currentName === 'thirdVote') {
                let previousValue = thirdVote

                let previousIndex = userSelectedIndices[2]
                userSelectedIndices[2] = previousIndex
                
                setThirdVote(previousValue)
                alert("Cannot vote for the same item twice, change the option")
            }
        }

        // console.log(72, pollDataFromStorage)
        localStorage.setItem('pollData', JSON.stringify(pollDataFromStorage))

        localStorage.setItem(user+'selectedIndices', JSON.stringify(userSelectedIndices))

    }

    const handleConfirmEditChanges  = () => {
        if(firstVote === secondVote || firstVote === thirdVote || secondVote === thirdVote) {
            alert("Cannot vote for the same item twice, change the option")
        } else {
            alert("Changes are updated")
        }
    }



    return (
        <div className="editPopup-root">
            { firstVote.length > 0 && 
                <div>
                    <p>Vote 1</p>
                    { userChoice.length > 0 ?
                        <select value={firstVote} onChange={handleVoteChange} name="firstVote">
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index} value={item.dishName}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    :
                    <select>
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    }
                </div>
            }

            {secondVote.length > 0 && 
                <div>
                    <p>Vote 2</p>
                    { userChoice.length > 0 ?
                        <select value={secondVote} onChange={handleVoteChange} name="secondVote">
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index} value={item.dishName}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    :
                    <select>
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    }
                </div>
            }

            { thirdVote.length > 0 &&
                <div>
                    <p>Vote 3</p>
                    { userChoice.length > 0 ?
                        <select value={thirdVote} onChange={handleVoteChange} name="thirdVote">
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index} value={item.dishName}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    :
                    <select>
                        { (foodPost && foodPost.length > 0)  &&
                            foodPost.map((item, index) => {
                                return (
                                    <option key={index}>{item.dishName}</option>
                                )
                            })
                        }
                    </select>
                    }
                </div>
            }
            <button onClick={handleConfirmEditChanges}>Confirm changes</button>
        </div>
    )
}

    
export default EditPopup;