import React from 'react';

import './../../index.css';
import './Wrapper.css';

function Wrapper({ children }) {

    return (
        <div className="page-background">
            <div className="page-content">
                {children}
            </div>
        </div>
    );
}

export default Wrapper;