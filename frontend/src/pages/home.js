import { useState, useEffect, useRef } from "react"
import "../assets/style/index.css"
import example from "../assets/images/user.jpg"
import { apiPost } from "../util/api"

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const nextPagingRef = useRef(0);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) return;
            if (nextPagingRef.current === undefined) return;

            const keyword = new URLSearchParams(window.location.search).get('keyword');

            function fetchProducts() {
                if (keyword) {
                    return apiPost.get(`/search?keyword=${keyword}&paging=${nextPagingRef.current}`);
                }
                return apiPost.get(`/all?paging=${nextPagingRef.current}`);
            }

            fetchProducts().then((json) => {
                if (nextPagingRef.current !== json.data.next_paging)
                    setPosts((prev) => [...prev, ...json.data.posts])
                nextPagingRef.current = json.data.next_paging;
                console.log('11111', json.data.posts);
            });
        }, { rootMargin: "200px 0px" });
        intersectionObserver.observe(document.querySelector('.waypoint'));
    }, []);

    return (
        <>
            <div className="posts">
                <div className="posts-container">
                    {posts && posts.map(post => {
                        return <Post key={post.id} post={post} />
                    })}
                </div>
            </div>
            <div className="waypoint"></div>
        </>
    )
}

const Post = ({ post }) => {
    function getDescription(description) {
        return description.length <= 40 ?
            description.replace(/\r\n/g, "，") :
            description.replace(/\r\n/g, "，").substring(0, 40) + '...';
    }
    return (
        <div className="post">
            <div className="post-user">
                <img src={example} alt="userIcon" className="img"></img>
                <label>{post.user_name}</label>
            </div>
            <div className="post-content">
                <h3 className="post-content-title">{post.title}</h3>
                <label>{getDescription(post.description)}</label>
                <img src={post.thumbnail} alt="postImage"></img>
            </div>
            <div className="post-footer">
                <div className="post-footer-like">
                    <div className="like-icon img"></div>
                    <label>{post.likes}</label>
                </div>
            </div>
        </div>
    )
}

const Home = () => {

    return <>
        <Posts />
    </>
}

export default Home