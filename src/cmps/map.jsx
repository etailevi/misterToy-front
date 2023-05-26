import React from "react";
import GoogleMapReact from 'google-map-react';
// import SendIcon from '@mui/icons-material/Send';
// import Button from '@material-ui/core/Button';
import { useState } from 'react'

function Marker() {
    return <div>📍</div>
}

export default function Map() {
    const [center, setCenter] = useState({ lat: 32.794, lng: 34.9896 })
    const zoom = 10
    const branches = [{
        city: 'Haifa',
        id: 101,
        position: {
            lat: 32.794,
            lng: 34.9896
        }
    },
    {
        city: 'Hadera',
        id: 102,
        position: {
            lat: 32.437408,
            lng: 34.925621
        }
    },
    {
        city: 'Tel Aviv',
        id: 103,
        position: {
            lat: 32.085300,
            lng: 34.781769
        }
    },
    ]

    return (
        // Important! Always set the container height explicitly
        <section className="map-container">
            {branches.map((branch) => {
                return (
                    <button className="btn-city" key={branch.city} onClick={() => setCenter(branch.position)}>
                        {branch.city}
                    </button>
                );
            })}

            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBjcHet6daOdcOGE772Rzv9XiU7oyZnZos" }}
                    defaultCenter={center}
                    center={center}
                    defaultZoom={zoom}
                >
                    {branches.map(branch => {
                        return <Marker lat={branch.position.lat} lng={branch.position.lng} key={branch.id} />
                    })}
                </GoogleMapReact>
            </div>
        </section>
    );
}
