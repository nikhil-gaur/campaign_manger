import React, { useEffect, useState } from 'react';
import "../styles/CampaignRow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import moment from "moment";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




function CampignRow({updateDate, campaign}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    useEffect(() => {
        if(!status) {
            statusChecker(campaign.createdOn)
            console.log(campaign);
        }
        
    }, []);
    

    const onDateChange = (id, date) => {
        updateDate(id, date);
        statusChecker(new Date(date).getTime());
        console.log(new Date(date));


    }

    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState("");
    const [timeDiff, setTimeDiff] = useState("");
    const [modalState, setIsModalState] = useState(false);

    // function to manage the modal state which set the modalState to opposite

    const manageState = () => {
        console.log("xy")
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

    const statusChecker = (creationDate) => {
        let currentDate = Date.now();

        var x = moment(creationDate).isAfter(currentDate);

        var a = moment(creationDate).startOf("day");
        var b = moment(currentDate).startOf("day");
    
        setTimeDiff(Math.abs(a.diff(b, 'days')));

        var diff = a.diff(b, 'days');

        if (diff > 0) {
            setStatus("upcoming");
        }
        else if (diff < 0) {
            setStatus("past")
        }
        else {
            setStatus("live")
        }

        console.log(status);

    } 

   


    return (
        <div className="campaignRow">
            <div className="campaignRow__date">
                <h3>{showMonth} {showYear}, {showDate}</h3>
                <p>{timeDiff} Days {status==="upcoming"? "Ahead": "Ago"}</p>
            </div>

            <div className="campaignRow__campaign">
                <div className="imageBox">
                    <img src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/game_icons%2Fmotal_kombat%2FBitmap.png?alt=media&token=23901d53-2897-4670-9e01-a9f827d66c97" alt="" />
                </div>
                
                <div className="campaign__info">
                    <h3>{game_name}</h3>
                    <p>{region}</p>
                </div>
            </div>
           
            <div className="campaignRow__view" onClick={handleShow}>
                <img src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/icons%2FPrice.png?alt=media&token=7abec9f7-e7cd-4ef5-9c30-e8ac36b40e80" alt="" />
                <p>View Pricing</p>
            </div>

            <Modal show={show} onHide={handleClose}>
        
        <Modal.Body><div className="modal__inner">
                            <div className="modal__top">
                                <img className="modal__image" src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/game_icons%2Fmotal_kombat%2FBitmap.png?alt=media&token=23901d53-2897-4670-9e01-a9f827d66c97" alt="" />
                                <div className="modal__info">
                                    <h3>{game_name}</h3>
                                    <p>{region}</p>
                                </div>
                            </div>
                            <div className="modal__bottom">
                                <h1>Pricing</h1>
                                <div className="periodOfPricing oneMonth">
                                    <h3>1 Week-1Month</h3>
                                    <p>:</p>
                                    <p>        $100</p>
                                </div>
                                <div className="periodOfPricing sixMonth">
                                    <h3>6 Month</h3>
                                    <p>:</p>
                                    <p>         $500</p>
                                </div>
                                <div className="periodOfPricing oneYear">
                                    <h3>1 Year</h3>
                                    <p>:</p>
                                    <p>          $900</p>
                                </div>
                            </div>
                            <div className="modalButton">
                                <button onClick={handleClose}>Close</button>
                            </div>
                    </div></Modal.Body>
                        
                    </Modal>


            <div className="campaignRow__actions">

                <div className="action__option csv">
                    <img src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/icons%2Ffile.png?alt=media&token=2d09da81-b9e2-439f-b119-d8bfdc04bef6" alt="" />
                    <p>CSV</p>
                </div>

                <div className="action__option report">
                    <img src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/icons%2Fstatistics-report.png?alt=media&token=6395afc7-9f17-45d8-82b9-c760a4216401" alt="" />
                    <p>Report</p>
                </div>

                <DatePicker
                    popperPlacement="bottom"
                    popperModifiers={{
                        flip: {
                            behavior: ["bottom"] // don't allow it to flip to be above
                        },
                        preventOverflow: {
                            enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                        },
                        hide: {
                            enabled: false // turn off since needs preventOverflow to be enabled
                        }
                    }}
                    selected={campaign_creationDate}
                    onChange={date => onDateChange(id, date)}
                    customInput={<div className="action__option scheduleAgain">
                    <img src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/icons%2Fcalendar.png?alt=media&token=0d1487b1-221c-4c61-882b-716d46387fa6" alt="" />
                    <p>Schedule Again</p>   
                    </div>
                                 }
                />
                
            </div>
            
        </div>
    )
}

export default CampignRow;


