import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
import { Rate } from 'antd';
import { Modal } from 'react-bootstrap';
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/style/postDetail.css";
import example from "../assets/images/user.jpg";
import { apiPost, apiCollection } from "../util/api";
let cardSelected = [];

const Card = ({ card }) => {
    function handleCheck(e) {
        const data = {
            id: card.location_id,
            place_id: card.place_id,
            name: card.location_name,
            x: card.location_x,
            y: card.location_y
        }

        if (e.target.checked) {
            cardSelected.push(data)
        } else {
            const indexOfObject = cardSelected.findIndex(object => {
                return object.id === data.id;
            });
            cardSelected.splice(indexOfObject, 1);
        }
    };

    return (
        <div className="postDetail-card">
            <div className="postDetail-card-title">
                <label className="check-group">
                    <input type="checkbox" className="123" onChange={(e) => handleCheck(e)} />
                    <span></span>
                </label>
                <label>{card.location_name}</label>
            </div>
            <div className="postDetail-card-img">
                <img src={card.image} alt="locationImg" />
            </div>
            <div className="postDetail-card-description">
                {card.description.split("\n").map((item, idx) => {
                    return <Description key={idx} str={item} />
                })}
            </div>
            <div className="postDetail-card-recommend">
                <label>推薦 :</label>
                <Rate disabled allowHalf defaultValue={card.recommend} />
            </div>
        </div>
    )
}

const Description = ({ str }) => {
    return (
        <>
            {str}<br />
        </>
    )
}

function CollectionModal(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [collections, setCollections] = useState();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!props.show || fetched) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            toast.error("請先登入!", { position: "top-center" });
            return navigate('/sign-in');
        }

        apiCollection(user.token).get(`/?user=${user.user_id}`)
            .then(json => {
                setCollections(json.data);
                setFetched(true);
            });
    }, [props.show]);

    function nameChange(e) {
        setName(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (name !== "") {
                return handleClick(0, name);
            }
            toast.warning("請輸入行程名稱!", { position: "top-center" });
        }
    }

    function handleClick(collection_id = 0, collection_name = "") {
        const { user_id, token } = JSON.parse(localStorage.getItem('user'));
        let data;
        if (cardSelected.length === 0) {
            toast.warning("請先選擇收藏地點!", { position: "top-center" });
            return;
        }
        if (collection_id !== 0) {
            data = JSON.stringify({
                "user_id": user_id,
                "collection_id": collection_id,
                "details": {
                    "list": cardSelected
                },
            })
        } else if (collection_name !== "") {
            data = JSON.stringify({
                "user_id": user_id,
                "collection_name": collection_name,
                "details": {
                    "list": cardSelected
                },
            })
        }

        apiCollection(token).post("/update", data)
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    props.onHide();
                    toast.success("新增成功", { position: "top-center" });
                }
            })

    }

    return (
        collections &&
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter2"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter2">
                    行程
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {collections && collections.map(c => {
                    return (
                        <button key={c.id} onClick={() => handleClick(c.id)}>{c.name}</button>
                    )
                })}
                <div className="modal-input-box" >
                    <input type="text" onChange={nameChange} onKeyDown={handleKeyDown} required />
                    <div className="modal-input-line"></div>
                    <span>新增行程分類</span>
                </div>
            </Modal.Body>
        </Modal>
    );
}

const PostDetail = () => {
    const [post, setPost] = useState();
    const [modalShow, setModalShow] = useState(false);
    const setupStatus = useRef(false);

    useEffect(() => {
        const post_id = new URLSearchParams(window.location.search).get('id');
        apiPost.get(`/detail?id=${post_id}`)
            .then(json => { setPost(json.data); console.log(json.data) })
    }, []);

    useEffect(() => {
        if (modalShow) {
            setupStatus.current = false;
        }
        if (!setupStatus.current) {
            return
        }
    }, [modalShow]);

    function handleClick() {
        setModalShow(true);
        setupStatus.current = true;
    }

    function timestampFormat(date) {
        const time = date.substring(0, 10);
        return time.replace('-', '年').replace('-', '月') + '日'
    }

    return (
        post &&
        <div className="postDetail">
            <div className="postDetail-container">
                <div className="postDetail-header">
                    <div className="postDetail-header-user">
                        <img src={example} alt="userIcon" className="img"></img>
                        <label>{post.user_name}</label>
                    </div>
                    <div className="postDetail-header-like">
                        <button></button>
                        <label>{post.likes}讚</label>
                    </div>
                    <div className="postDetail-header-collection">
                        <button onClick={handleClick}></button>
                        <CollectionModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <label>加入行程</label>
                    </div>
                </div>
                <h1 className="postDetail-title">{post.title}</h1>
                <div className="postDetail-date">
                    <label>{timestampFormat(post.created_at)}</label>
                </div>
                <div className="postDetail-description">
                    {post.description.split("\n").map((item, idx) => {
                        return <Description key={idx} str={item} />
                    })}
                </div>
                <div className="postDetail-cards">
                    {post.cards.map(card => {
                        return <Card key={card.location_id} card={card} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostDetail