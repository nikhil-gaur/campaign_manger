import React, { useState } from 'react';
import "../styles/Feed.css";
import Campaigns from "./Campaigns";

function Feed() {


    const [stateSelected, setStateSelected] = useState("upcomingData");

    const handleStateUpcoming = (event) => {
        setStateSelected("upcomingData");
        document.getElementById('feed__upcoming').classList.add('state--active');
        document.getElementById('feed__live').classList.remove('state--active');
        document.getElementById('feed__past').classList.remove('state--active');

    }

    const handleStateLive = () => {
        setStateSelected("liveData");
        document.getElementById('feed__live').classList.add('state--active');
        document.getElementById('feed__upcoming').classList.remove('state--active');
        document.getElementById('feed__past').classList.remove('state--active');
    }

    const handleStatePast = () => {
        setStateSelected("pastData");
        document.getElementById('feed__past').classList.add('state--active');
        document.getElementById('feed__live').classList.remove('state--active');
        document.getElementById('feed__upcoming').classList.remove('state--active');

    }


    return (

        <div className="feed">

            <div className="state__selector" >

                <span class="state state--active" id="feed__upcoming" onClick={handleStateUpcoming}>
                    <h1>Upcoming <span className="state__genral">Campaigns</span></h1>
                </span>
                <span class="state" id="feed__live" onClick={handleStateLive}>
                    <h1>Live <span className="state__genral">Campaigns</span></h1>
                </span>
                <span class="state" id="feed__past" onClick={handleStatePast}>
                    <h1>Past <span className="state__genral">Campaigns</span></h1>
                </span>

            </div>
            
            <hr></hr>

            {/* passing state selected into tab as a prop so that we can filter the rows of campaign as per current tab selected on feed */}

            <Campaigns 
               tab = {stateSelected}
            />
        

        </div>
    )
}

export default Feed;
