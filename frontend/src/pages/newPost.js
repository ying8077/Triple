import { cloneElement, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Rate } from 'antd';
import { apiPostImg, apiPost } from "../util/api";
import { useGoogleMapsLoader } from '../hooks/useGoogleMapsScript';
import "../assets/style/post.css";

function handleTextAreaChange(event, textAreaHeight, setHeight) {
    const height = event.target.scrollHeight;
    const rowHeight = 27;
    const trows = Math.ceil(height / rowHeight);
    if (trows !== textAreaHeight) {
        setHeight(trows);
    }
}

const Img = ({ values, setValues }) => {
    const [file, setFile] = useState(0);

    function handleDelete() {
        setFile(0);
    }

    function fileUpdate(e) {
        const file = e.target.files[0];
        if (file) {
            setFile(window.URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("card_image", file);

            apiPostImg.post("/img", formData)
                .then(res => res.data)
                .then(data => {
                    if (data.status === "success") {
                        setValues({ ...values, ["image"]: data.filename });
                    }})
        }
    }
    if (file !== 0) {
        return (
            <div className="newPost-card-img">
                <img src={file} id="fileUpdated" alt="imgUploaded"/>
                <button onClick={handleDelete}></button>
            </div>
        )
    }
    return (
        <div className="newPost-card-img">
            <input type="file" className="inputfile" id="file" name="uploaded_file" onChange={(e) => fileUpdate(e)}></input>
            <label htmlFor="file">
                <div className="newPost-card-img-icon"></div>
                <span>點擊虛線區上傳圖片</span>
            </label>
        </div>
    )
}

const NewCard = (props) => {
    const navigate = useNavigate();
    const isLoaded = useGoogleMapsLoader();
    const [textareaheight, setTextareaheight] = useState(1);
    const [nameData, setName] = useState('');
    const [values, setValues] = useState({
        image: "",
        description: "",
        recommend: 0,
        location: ""
    });

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        fields: ["place_id","geometry", "name"],
        types: ["establishment"]
    };

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleNameChange = e => {
        setName(e.target.value);
    };

    const onSubmit = () => {
        props.submit(props.childIndex, values);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            toast.error("請先登入!", { position: "top-center" });
            navigate('/sign-in');
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", function () {
            const place = autoCompleteRef.current.getPlace();
            const geometry = place.geometry.location.toJSON();
            const name = place.name;
            console.log(place)

            const location_data = {
                "place_id": place.place_id,
                "name": name,
                "latitude": geometry.lat,
                "longitude": geometry.lng
            }

            setName(name);
            setValues({ ...values, ["location"]: location_data });
        });
    }, [isLoaded]);

    return (
        <div className="newPost-card">
            <button className='newPost-card-btn-save' onClick={onSubmit}>儲存</button>
            <input ref={inputRef} onChange={handleNameChange} value={nameData} />
            <Img values={values} setValues={setValues} />
            <textarea
                name='description'
                rows={textareaheight}
                onChange={(e) => {
                    handleChange(e);
                    handleTextAreaChange(e, textareaheight, setTextareaheight);
                }}
                placeholder="...">
            </textarea>
            <div className="newPost-card-recommend">
                <label>推薦 :</label>
                <Rate onChange={(value) => { setValues({ ...values, ["recommend"]: value }); }} allowHalf defaultValue={0} />
            </div>
        </div>
    )
}

const NewPost = () => {
    const navigate = useNavigate();
    const [textareaheight, setTextareaheight] = useState(1);
    const [mapOfValues, setMapOfValues] = useState({});
    const [list, setList] = useState([]);
    const [values, setValues] = useState({
        title: "",
        description: "",
    });

    useEffect(()=>{
        setList([...list, <NewCard />]);
    },[])

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChildSubmit = (childIndex, value) => {
        setMapOfValues({
            ...mapOfValues,
            [childIndex]: { value }
        });
    };

    const onSubmit = () => {
        const user_id = JSON.parse(localStorage.getItem('user')).user_id;
        let cards_data = []
        for (let i = 0; i < list.length; i++) {
            cards_data.push(mapOfValues[i]['value']);
        }
        const data = JSON.stringify({
            "user_id": user_id,
            "title": values.title,
            "description": values.description,
            "cards": cards_data,
        })

        apiPost.post("/", data)
            .then(res => res.data)
            .then(data => {
                if (data.status === "success") {
                    toast.success("貼文新增成功!", { position: "top-center" });
                    navigate('/');
                }
            })

        console.log(data);
    }

    function handleAppend() {
        setList([...list, <NewCard />]);
    }

    return (
        <div className="newPost">
            <div className="newPost-container">
                <div className="newPost-header">
                    <h2>建立新貼文</h2>
                    <button onClick={onSubmit} >分享</button>
                </div>
                <div className="newPost-content">
                    <input type="text" className="newPost-content-title" name="title" onChange={handleChange} placeholder="標題" />
                    <textarea
                        name="description"
                        className="newPost-content-description"
                        rows={textareaheight}
                        onChange={(e) => {
                            handleChange(e);
                            handleTextAreaChange(e, textareaheight, setTextareaheight);
                        }}
                        placeholder="...">
                    </textarea>
                    <div className='newPost-cards'>
                        {list.map((value, idx) =>
                            cloneElement(value, { key: idx, childIndex: idx, submit: onChildSubmit })
                        )}
                    </div>
                    <button className='newPost-btn-add' onClick={handleAppend}></button>
                </div>
            </div>
        </div>
    )
}

export default NewPost