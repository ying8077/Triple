import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../assets/style/profile.css"
import { apiCollection } from "../util/api"

const Profile = () => {
    const [collections, setCollections] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            toast.error("請先登入!", { position: "top-center" });
            return navigate('/sign-in');
        }

        apiCollection(user.token).get(`/?user=${user.user_id}`)
            .then(json => setCollections(json.data))
    }, [])

    return (
        <div className="profile">
            <div className="profile-container">
                <h2>我的行程</h2>
                <div className="collections">
                    {collections && collections.map(collection => {
                        return (
                            <div
                                key={collection.id}
                                className="collection"
                                onClick={() =>
                                    navigate(`collection?id=${collection.id}`,
                                        { state: { data: JSON.parse(collection.details).list, name: collection.name } }
                                    )}>
                                <img src={collection.image} alt="collectionImg" />
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