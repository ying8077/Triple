import { cloneElement, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { Modal, ConfigProvider, DatePicker, Tabs } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import "../assets/style/map.css"
import blueIcon from "../assets/images/map.png"
import { useGoogleMapsLoader } from '../hooks/useGoogleMapsScript';

const Collection = () => {
    const navigate = useNavigate();
    const mapRef = useRef();
    const location = useLocation();
    const isLoaded = useGoogleMapsLoader();
    const [pathList, setPathList] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const locations = location.state.data;
    let map;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            toast.error("請先登入!", { position: "top-center" });
            navigate('/sign-in');
        }

        setPathList([...pathList, <option></option>, <option></option>]);
    }, [])

     useEffect(() => {
        if (!isLoaded) return;
        initMap();
    }, [isLoaded])

    function showPath() {
        const option = document.querySelectorAll('option');
        const deirectionsService = new window.google.maps.DirectionsService();
        const waypts = [];
        const route = [];
        let placeData;

        if (option.length === 2) {
            placeData = {
                origin: { placeId: option[0].value },
                destination: { placeId: option[1].value },
                travelMode: 'DRIVING'
            }
        }
        else if (option.length > 2) {
            for (let i = 1; i < option.length - 1; i++) {
                waypts.push({
                    location: { placeId: option[i].value },
                    stopover: true,
                });
            }
            placeData = {
                origin: { placeId: option[0].value },
                destination: { placeId: option[option.length - 1].value },
                waypoints: waypts,
                travelMode: 'DRIVING'
            }
        }

        deirectionsService.route(
            placeData, (response, status) => {
                if (status === 'OK') {
                    const border = new window.google.maps.Polyline({
                        path: response.routes[0].overview_path,
                        strokeColor: '#7694A8',
                        strokeOpacity: 0.9,
                        strokeWeight: 10
                    });
                    const path = new window.google.maps.Polyline({
                        path: response.routes[0].overview_path,
                        geodesic: true,
                        strokeColor: "#6ABCF6",
                        strokeOpacity: 0.8,
                        strokeWeight: 6,
                    });
                    border.setMap(map);
                    path.setMap(map);

                    const legs = response.routes[0].legs;
                    setTimeList([]);
                    setTotal(0);
                    for (let i = 0; i < legs.length; i++) {
                        route.push(<RouteTime time={legs[i].duration.text} />);
                        setTimeList(...timeList, route);
                        setTotal((prev) => prev + legs[i].duration.value);
                    }

                }
                console.log(response);
                console.log(status);
            })
    }

    function initMap() {
        let location = {
            lat: Number(locations[0].x),
            lng: Number(locations[0].y)
        };

        map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 10,
            mapTypeId: 'roadmap',
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });

        for (let i = 0; i < locations.length; i++) {
            let latLng = new window.google.maps.LatLng(locations[i].x, locations[i].y);
            let marker = new window.google.maps.Marker({
                position: latLng,
                icon: blueIcon,
                map: map,
                label: {
                    text: locations[i].name,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#5E7A8D',
                    className: `map-marker ${locations[i].place_id}`
                },
            });

            marker.addListener('click', e => {
                const input = document.querySelectorAll('option');
                const label = marker.label;

                for (let i = 0; i < input.length; i++) {
                    if (input[i].label === "") {
                        input[i].label = label.text;
                        input[i].value = label.className.split(" ")[1];
                        break;
                    }
                }

                if (input.length >= 2) {
                    for (let i = 0; i < input.length; i++) {
                        if (input[i].label === '') {
                            return;
                        }
                    }
                    showPath();
                }
            });
        }
    }

    function handleAppend() {
        setPathList([...pathList, <option></option>]);
    }

    function getTotalTime(seconds) {
        let daysec = 24 * 60 * 60;
        let hoursec = 60 * 60;
        let minutesec = 60;

        let dd = Math.floor(seconds / daysec);
        let hh = Math.floor((seconds % daysec) / hoursec);
        let remainingSec = seconds % hoursec;
        let mm = Math.round(remainingSec / minutesec);

        if (mm === 60) {
            mm = 0;
            hh += 1;
        }

        if (hh === 24) {
            hh = 0;
            dd += 1;
        }

        if (dd > 0) {
            return `${dd}天${hh}小時${mm}分鐘`;
        } else if (hh > 0) {
            return `${hh}小時${mm}分鐘`;
        } else {
            return `${mm}分鐘`;
        }
    }

    const Note = () => {
        const [tab, setTab] = useState([]);
        const [active, setActive] = useState();
        const { RangePicker } = DatePicker;
        const tabs = [];
        dayjs.locale('zh-tw');

        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`)
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf())
            dat.setDate(dat.getDate() + days);
            return dat;
        }

        function handleDateChange(date, dateString) {
            const startDate = dayjs(date[0]).toDate();
            const endDate = dayjs(date[1]).toDate();
            const dateArray = getDates(startDate, endDate);

            setActive(dateArray[0]);
            dateArray.map((date) => {
                tabs.push({
                    label: date,
                    key: date,
                    children: <Table />
                })
            })
            setTab(tabs);
        }

        const Table = () => {
            const [trList, setTrList] = useState([]);

            function handleAppend() {
                setTrList([...trList, <RowOfTable />]);
            }

            function handlePaste() {
                const option = document.querySelectorAll('option');
                const defaultData = [];
                for (let i = 0; i < option.length; i++) {
                    defaultData.push(<RowOfTable value={option[i].label} />);
                    setTrList(...trList, defaultData);
                }
            }

            const RowOfTable = ({ value = "" }) => {
                return (
                    <tr>
                        <td><input type="text" placeholder="00:00" /></td>
                        <td><input type="text" placeholder="..." defaultValue={value} /></td>
                        <td><input type="text" placeholder="景點" /></td>
                        <td><input type="text" placeholder="..." /></td>
                    </tr>
                )
            }

            return (
                <>
                    <div className="map-note-btnGroup">
                        <div className="map-note-btn-add" onClick={handleAppend}></div>
                        <div className="map-note-btn-paste" onClick={handlePaste}></div>
                    </div>
                    <div className="map-note-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>時間</th>
                                    <th>地點</th>
                                    <th>性質</th>
                                    <th>備註</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trList && trList.map((value, idx) =>
                                    cloneElement(value, { key: idx })
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        }

        function tabOnChange(key) {
            setActive(key);
        }

        return (
            <>
                <div className="map-modal-btn" onClick={() => setModalOpen(true)}>行程草稿</div>
                <Modal
                    title={
                        <div className="map-modal-title">
                            <div className="map-modal-title-name">{location.state.name}</div>
                            <ConfigProvider locale={zhTW}>
                                <RangePicker style={{ width: 250 }} onChange={handleDateChange} />
                            </ConfigProvider>
                        </div>
                    }
                    width={900}
                    style={{ top: 120, right: 300 }}
                    bodyStyle={{ height: 560 }}
                    open={modalOpen}
                    footer={null}
                    onCancel={() => setModalOpen(false)}
                >
                    <div className="note-calender">
                        <Tabs
                            activeKey={active}
                            items={tab}
                            onChange={tabOnChange}
                        />
                    </div>
                </Modal>
            </>
        )
    }

    return (
        <div className="map">
            <div className="map-container">
                <div ref={mapRef} className="map-gmap"></div>
                <div className="map-right">
                    <Note />
                    <div className="map-route">
                        <div className="map-route-path">
                            {pathList.map((value, idx) =>
                                cloneElement(value, { key: idx })
                            )}
                            <label className="map-route-totalTime">總時長: {getTotalTime(total)}</label>
                            <div className="map-route-add">
                                <div className="map-route-add-icon" onClick={handleAppend}></div>
                                <label>新增目的地</label>
                            </div>
                        </div>
                        <div className="map-route-timeList">
                            {timeList && timeList.map((value, idx) =>
                                cloneElement(value, { key: idx })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RouteTime = ({ time }) => {
    return (
        <div className="map-route-time">
            <div className="map-route-time-icon"></div>
            <label>約 {time}</label>
        </div>
    )
}
export default Collection