import React from "react";

const HeaderItem = props => {
    return (
        <div className="header-item">
            { props.children }
        </div>
    );
}

export default HeaderItem;