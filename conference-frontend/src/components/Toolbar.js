import React from 'react';

function Toolbar(props) {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Conference Management</span>
                    <div className="mdl-layout-spacer"></div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only">
                        {props.children}
                    </nav>
                </div>
            </header>
        </div>
    );
}
export default Toolbar;