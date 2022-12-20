import { useState, useEffect } from "react"
import "../assets/style/profile.css"
import example from "../assets/images/user.jpg";
import { apiCollection } from "../util/api"
const user_id = JSON.parse(localStorage.getItem('user')).user_id;

const Profile = () => {
    const [collections, setCollections] = useState();

    useEffect(() => {
        apiCollection.get(`/?user=${user_id}`)
            .then(json => setCollections(json.data))
    }, [])

    return (
        <div className="profile">
            <div className="profile-container">
                <h2>我的行程</h2>
                <div className="collections">
                    {collections && collections.map(collection => {
                        return (
                            <div key={collection.id} className="collection">
                                <img src={collection.image} />
                                <label>{collection.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile;