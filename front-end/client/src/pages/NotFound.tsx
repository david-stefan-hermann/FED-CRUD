import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <h1> </h1>
                    <img src="/404.png" alt="Not Found" style={{maxWidth: '100%', height: 'auto'}} />
                    <Link to={"/Rezepte"}>Zur Übersicht</Link>
                    <h1> </h1>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
