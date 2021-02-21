import React from 'react';
import "../styles/Header.css";

function Header() {
    return (
        <div className="header">
            <div className="header__top">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/campaign-manager-aebc6.appspot.com/o/logo%2Flogo.png?alt=media&token=ecdf3fa1-d4df-4552-9ef6-715c8f975b9f"
                    alt=""
                    className="header__image"
                />    
            </div>
            <div className="header__bottom">
                <h1 >Manage Campaigns</h1>
            </div>
            
        
        </div>
    )
}

export default Header;
