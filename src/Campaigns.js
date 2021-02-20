import React, { useEffect, useState } from 'react';
import "./Campaigns.css";
import CampaignRow from "./CampignRow";
import * as dataFromFile from "./Constants";
import moment from "moment";
import db from "./firebase";

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
            
            let response = await fetch("https://run.mocky.io/v3/6df39c14-b8ab-4c31-86ce-167a5f043ae5");

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
            if (campaign.createdOn > currentDate ) 
                return campaign;
            
        });
    }

    else if (tab=="pastData") {
        tabData=campaignData.filter((campaign) => {
            if (campaign.createdOn < currentDate ) 
                return campaign;
            
        });
    }

    // const upcomingData = campaignData.filter((campaign) => {
    //     if (campaign.createdOn > currentDate ) 
    //         return campaign;
        
    // });

    // const pastData = campaignData.filter((campaign) => {
    //     if (campaign.createdOn < currentDate ) 
    //         return campaign;
        
    // });

    // const liveData = campaignData.filter((campaign) => {
    //     if (campaign.createdOn === currentDate ) 
    //         return campaign;
        
    // });

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

            {/* Issue > live campaign is visible in past > resolved */}

            {/* mapping tabData to render campaigns that are filtered */}

            {tabData.map(
                (campaignRow) => (
                    <CampaignRow 

                        updateDate={updateDate}
                        campaign={campaignRow}

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

