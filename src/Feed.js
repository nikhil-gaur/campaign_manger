import React, { useState } from 'react';
import "./Feed.css";
import Campaigns from "./Campaigns";


function Feed() {

    // stateSelected denotes the selected Tab on Main feed, upcoming tab selected by default

    const [stateSelected, setStateSelected] = useState("upcomingData");

    // Adding active tab class to selected Tab and setting up stateSelected variable whenevever a tab is switched

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

                {/* 3 main status tabs on main feed */}

                <div class="state state--active" id="feed__upcoming" onClick={handleStateUpcoming}>
                    <h1>Upcoming Campaigns</h1>
                </div>
                <div class="state" id="feed__live" onClick={handleStateLive}>
                    <h1>Live Campaigns</h1>
                </div>
                <div class="state" id="feed__past" onClick={handleStatePast}>
                    <h1>Past Campaigns</h1>
                </div>

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
