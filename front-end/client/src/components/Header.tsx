import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'


const Header = () => {

    return (
        <header>
            <Navbar expand="lg" className="c-dark background-dark">
                <Container>
                    <Navbar.Brand 
                            href="/"
                        ><img
                        alt=""
                        src={process.env.PUBLIC_URL + "/fed-logo.png"}
                        width="70"
                        height="70"
                        className=""
                    /></Navbar.Brand>
                    <Navbar.Brand 
                        className="background-color-text me-auto" 
                        href="/"
                    ><span className="fw-bold">
                        Bits<span className="not-active">&</span>Bites &nbsp;
                    </span>
                    <span>
                        –&nbsp; IT Studenten entdecken die Kochwelt    
                    </span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header