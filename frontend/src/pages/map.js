import { cloneElement, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import "../assets/style/map.css"
import blueIcon from "../assets/images/map.png"


const Collection = () => {
    const navigate = useNavigate();
    const mapRef = useRef();
    const statusRef = useRef(false);
    const location = useLocation();
    const [list, setList] = useState([]);
    let placeList = []
    let map;
    let state = 0;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            toast.error("請先登入!", { position: "top-center" });
            navigate('/sign-in');
        }
        console.log(location.state.data);
        setList([...list, <option></option>, <option></option>]);
        initMap();

    }, [])

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    var el = document.createElement("span");
    el.innerHTML = "test";
    var div = document.getElementById("foo");
    // insertAfter(div, el);

    function showPath() {
        const option = document.querySelectorAll('option');
        const deirectionsService = new window.google.maps.DirectionsService();
        const waypts = [];
        let placeData;

        console.log(option[0].parentNode);
        console.log(option[0].nextSibling);
        var el = document.createElement("span");
        el.innerHTML = "test";
        // option[0].parentNode.insertBefore(el, option[0].nextSibling);

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
            console.log(waypts);
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
                    const flightPath = new window.google.maps.Polyline({
                        path: response.routes[0].overview_path,
                        geodesic: true,
                        strokeColor: "#00B0FF",
                        strokeOpacity: 0.8,
                        strokeWeight: 6,
                    });
                    flightPath.setMap(map);
                }
                console.log(response);
                console.log(status);
            })
    }

    const locations = location.state.data;

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

        // const deirectionsService = new window.google.maps.DirectionsService();
        // deirectionsService.route({
        //     origin: { placeId: 'ChIJNWZ9VpgrZjQRI0s9zkIwdOs'},
        //     destination: { placeId: 'ChIJTQl2JfonZjQRfPWBpKe5oVk'},
        //     travelMode: 'DRIVING'
        // }, (response, status) => {
        //     if(status === 'OK'){
        //         const border = new window.google.maps.Polyline({
        //             path: response.routes[0].overview_path,
        //             strokeColor: '#1967D2', 
        //             strokeOpacity: 0.9,
        //             strokeWeight: 10 
        //         });
        //         const flightPath = new window.google.maps.Polyline({
        //             path: response.routes[0].overview_path,
        //             geodesic: true,
        //             strokeColor: "#00B0FF",
        //             strokeOpacity: 0.8,
        //             strokeWeight: 6,
        //         });
        //         border.setMap(map);
        //         flightPath.setMap(map);
        //     }
        //     console.log(response);
        //     console.log(status);
        // })

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
                        // console.log(input[i].value);
                        break;
                    }
                }

                if (input.length >= 2) {
                    for (let i = 0; i < input.length; i++) {
                        if (input[i].label === '') {
                            console.log("<2");
                            return;
                        }
                    }
                    showPath();
                    console.log('>=2');
                }
            });
        }

    }

    function handleAppend() {
        setList([...list, <option></option>]);
    }

    return (
        <div className="map">
            <div className="map-container">
                <div ref={mapRef} className="map-gmap"></div>
                <div className="map-route">
                    {list.map((value, idx) =>
                        cloneElement(value, { key: idx })
                    )}
                    <div className="map-route-add">
                        <div className="map-route-add-icon" onClick={handleAppend}></div>
                        <label>新增目的地</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection