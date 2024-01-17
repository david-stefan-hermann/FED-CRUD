import React from "react";
import Button from 'react-bootstrap/Button';

const Logout = () => {
    return (
        <>
            <h3 className="my-4">Logout</h3>
            <Button onClick={() => console.log("logout")}>Abmelden</Button>
        </>
    )
}

export default Logout