import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import "./Survey.css"


export default function Answer( {answer} ) {

    return (
        
        <div className="answer-text">
            {answer}
        </div>
    );
}

Answer.propTypes = {
    answer: PropTypes.string,
};


