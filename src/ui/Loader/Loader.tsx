import React from 'react';
import {HashLoader} from 'react-spinners';
import './Loader.scss';

export default function Loader() {
    return (
        <div className="loader">
            <div className="loader__container">
                <HashLoader color="#5218d0" />
            </div>
        </div>
    );
}
