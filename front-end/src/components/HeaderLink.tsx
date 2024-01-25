import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';


const HeaderLink = (name: string, link: string) => {

    const [location, setLocation] = useState(window.location.pathname.split('/')[1])

    useEffect(() => {
        setLocation(window.location.pathname.split('/')[1])
    }, [window.location.pathname])
    
    return (
        <>
        {
            location === link ?
            <Nav.Link href={"/" + link + "/"} className="header-link">Rezepte</Nav.Link> :
            <Nav.Link href={"/" + link + "/"} className="header-link header-link-active">Home</Nav.Link>
        }
        </>
    )
}

export default HeaderLink
