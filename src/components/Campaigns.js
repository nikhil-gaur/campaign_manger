import React, { useEffect, useState } from 'react';
import "../styles/Campaigns.css";
import CampaignRow from "./CampignRow";
import * as dataFromFile from "./Constants";
import moment from "moment";


function Campaigns({tab}) {

    // storing campaignData using useState

    const [campaignData, setCampaignData] = useState([]);

    // fetching data on every refresh by calling fethData function

    useEffect(() => {
       fetchData();
    }, [])

    const fetchData = async() => {
        
        console.log("qwert")
        console.log(!campaignData.length);

        if(!campaignData.length){

            const url = "https://run.mocky.io/v3/78852800-5fcd-4925-ac65-b74d9d740526"
            
            let response = await fetch(url);

            // issue > response.data is undefined

            console.log(response.data); 
            
            let newData=await response.json();
            console.log("abcd");
            console.log(newData.data);
            setCampaignData(newData.data);
        }
    }

    //  fetch data from firebase

    // useEffect(
    //     () => {
    //         db.collection("campaign")
    //         .orderBy("timestamp", "desc")
    //         .onSnapshot(
    //             (snapshot) => setCampaignData(sanapshot.docs.map( (doc) => ({ id:doc.id, data:doc.data() }) ))
    //         );
    //     },
    //     []);



    //update the Campaign data for campaign which is re-scheduled 

    const updateDate = (id,date) => {
        let newDate = new Date(date);
    
        let newCampaignData = campaignData.map((campaign)=>{
            if (campaign.id === id) {
                campaign.createdOn = newDate.getTime();
            }
            return campaign;
        })

        setCampaignData(newCampaignData);
    } 


    // filtering camapaigns according to the tab which is selected and storing it into tabData

    let currentDate = new Date().getTime();
    let tabData = [];

    

    if (tab=="liveData") {
        tabData=campaignData.filter((campaign) => {

            // Usong moment library to match the exact date for live status

            if (moment(campaign.createdOn).startOf('day').valueOf() === moment(currentDate).startOf('day').valueOf() ) 
                return campaign;   
        });
    }

    else if (tab=="upcomingData") {
        tabData=campaignData.filter((campaign) => {
            if (moment(campaign.createdOn).startOf('day').valueOf() > moment(currentDate).startOf('day').valueOf()) 
                return campaign;
            
        });
    }

    else if (tab=="pastData") {
        tabData=campaignData.filter((campaign) => {
            if (moment(campaign.createdOn).startOf('day').valueOf() < moment(currentDate).startOf('day').valueOf()) 
                return campaign;
            
        });
    }

    console.log(tab);


    return (
        <div className="campaigns">
            <div className="campaigns__header">
                <div className="campaignHeader__column date">
                    <h2>DATE</h2>
                </div>
                <div className="campaignHeader__column campaign">
                    <h2>CAMPAIGN</h2>
                </div>
                <div className="campaignHeader__column view">
                    <h2>VIEW</h2>
                </div>
                <div className="campaignHeader__column actions">
                    <h2>ACTIONS</h2>
                </div>
            </div>

            {/* mapping tabData to render campaigns that are filtered */}

            {tabData.map(
                (campaignRow) => (
                    <CampaignRow 

                        updateDate={updateDate}
                        campaign={campaignRow}
                        key={campaignRow.id}

                        // campaign_creationDate={campaignRow.createdOn}
                        // game_name={campaignRow.gname}
                        // region={campaignRow.region}
                        // price={campaignRow.price}
                        // csv={campaignRow.csv}
                        // report={campaignRow.report}
                        // game_icon={campaignRow.image_url}
                    />
                )
            )}

        </div>
    )
}

export default Campaigns;

