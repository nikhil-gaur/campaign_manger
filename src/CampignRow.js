import React, { useState } from 'react';
import "./CampaignRow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


function CampignRow({updateDate, campaign}) {
    
    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState("");
    const [timeDiff, setTimeDiff] = useState("");
    const [modalState, setIsModalState] = useState(false);

    // function to manage the modal state which set the modalState to opposite

    const manageState = () => {
        setIsModalState(!modalState);
        console.log("hello");
    }

    // destructuring campaign object so that we dont have to use campaign.propery at multiple places

    let {createdOn: campaign_creationDate, gname: game_name, region, price, csv, report, id} = campaign;

    // collecting the month, day, year seprately so that we can sho it in desirable format

    const showDate = new Date(campaign_creationDate).getDate();
    const showMonthNumber = new Date(campaign_creationDate).getMonth();
    const showYear = new Date(campaign_creationDate).getFullYear();

    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
         "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const showMonth = monthNames[showMonthNumber];

    // function to check the difference in no. of days

    const statusChecker = (campaign_creationDate) => {
        let currentDate = Date.now();

        const actualDiff = campaign_creationDate - currentDate;
        const daysDiff = Math.floor(actualDiff/(1000 * 60 * 60 * 24))

        console.log(daysDiff); 


        // setTimeDiff(daysDiff);

        // if (daysDiff > 0) {
        //     setStatus("upcoming");
        // }
        // else if (daysDiff < 0) {
        //     setStatus("past")
        // }
        // else {
        //     setStatus("live")
        // }

        // console.log(status);

        
    } 

    statusChecker(1559807714999);


    return (
        <div className="campaignRow">
            <div className="campaignRow__date">
                <h3>{showMonth} {showYear}, {showDate}</h3>
                <p>5 Ago/Ahead</p>
            </div>

            <div className="campaignRow__campaign">
                <img src="https://i.ibb.co/CzZK9Bw/Bitmap.png" alt="" />
                <div className="campaign__info">
                    <h3>{game_name}</h3>
                    <p>{region}</p>
                </div>
            </div>
                <div className={`modalBackground modalShowing-${modalState}`}>
                    <div className="modal__inner">
                            <div className="modal__top">
                                <img src="https://i.ibb.co/CzZK9Bw/Bitmap.png" alt="" />
                                <div className="campaign__info">
                                    <h3>Auto Chess</h3>
                                    <p>US</p>
                                </div>
                            </div>
                            <div className="modal__bottom">
                                <h1>Pricing</h1>
                                <div className="periodOfPricing oneMonth">
                                    <h3>1 Week-1Month</h3>
                                    <p>$ 100</p>
                                </div>
                                <div className="periodOfPricing sixMonth">
                                    <h3>6 Month</h3>
                                    <p>$ 500</p>
                                </div>
                                <div className="periodOfPricing oneYear">
                                    <h3>1 Year</h3>
                                    <p>$ 900</p>
                                </div>
                            </div>
                            <div className="modalButton">
                                <button>Close</button>
                            </div>
                    </div>
                </div>
            <div className="campaignRow__view" onClick={() => manageState()}>
                <img src="https://i.ibb.co/c3d9rKR/Price.png" alt="" />
                <p>View Pricing</p>
            </div>

            <div className="campaignRow__actions">

                <div className="action__option csv">
                    <img src="https://i.ibb.co/bmHX8Lj/file.png" alt="" />
                    <p>CSV</p>
                </div>

                <div className="action__option report">
                    <img src="https://i.ibb.co/jVCsG33/statistics-report.png" alt="" />
                    <p>Report</p>
                </div>

                <DatePicker
                    selected={campaign_creationDate}
                    onChange={date => updateDate(id, date)}
                    customInput={<div className="action__option scheduleAgain">
                                    <img src="https://i.ibb.co/Xkjv8qr/calendar.png" alt="" />
                                    <p>Schedule Again</p>
                                    </div>
                                }
                />
                
            </div>
            
        </div>
    )
}

export default CampignRow;


