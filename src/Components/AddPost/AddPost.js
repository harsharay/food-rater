import React, { useState, useEffect } from "react"

import "./AddPost.css"

const AddPost = (props) => {

    const [postData, setPostData] = useState({
        dishName: "",
        dishCuisine: "",
        dishImageUrl: ""
    })

    const [postDataArray , setPostDataArray] = useState([])

    const [counter, setCounter] = useState(2)

    
    useEffect(() => {
        localStorage.setItem('counter', counter)
    },[counter])


    const handleChange = e => {
        let name = e.target.name
        let value = e.target.value

        setPostData(prevValue => {
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    useEffect(() => {
        if(postDataArray.length > 0) {
            const username = localStorage.getItem('username') || props.location.username
            let dataToBeAdded = JSON.stringify(postDataArray)

            localStorage.setItem(username, dataToBeAdded)
        }
    },[postDataArray])

    useEffect(() => {
        const username = localStorage.getItem('username') || props.location.username

        if(localStorage.getItem(username)) {
            setPostDataArray(JSON.parse(localStorage.getItem(username)))
            setCounter(2 - JSON.parse(localStorage.getItem(username)).length)
        }
    },[])


    //props.location.username
    const handleAddPost = () => {

        const postCounter = localStorage.getItem('counter') || counter

        if(postCounter>0) {
            if(postData.dishName.length > 0 && postData.dishCuisine.length > 0 && postData.dishImageUrl.length > 0) {

                const { dishName, dishCuisine, dishImageUrl } = postData
                const username = localStorage.getItem('username') || props.location.username
    
                setPostDataArray(prev => {
                    return [
                        ...prev,
                        {
                            dishName,
                            dishCuisine,
                            dishImageUrl,
                            username
                        }
                    ]
                })
                setCounter(prevValue => prevValue-1)
            } else {
                alert("Enter all the details")
            }
        } else {
            alert("A user can add only 2 posts. Limit will exceed")
        }
    }

    return (
        <div className="addPost-root">
            <div className="addPost-block">
                <div>
                    <p>Name of the dish</p>
                    <input type="text" onChange={handleChange} name="dishName" value={postData.dishName}/>
                </div>
                <div>
                    <p>Cuisine of the dish</p>
                    <input type="text" onChange={handleChange} name="dishCuisine" value={postData.dishCuisine}/>
                </div>
                <div>
                    <p>Image of the dish</p>
                    <input type="text" onChange={handleChange} name="dishImageUrl" value={postData.dishImageUrl}/>
                </div>
                <button onClick={handleAddPost}>Add the post</button>
            </div>
        </div>
    )
}

export default AddPost;
