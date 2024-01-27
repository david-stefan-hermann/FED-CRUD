import React from 'react'
import Container from 'react-bootstrap/Container'


const Footer = () => {
    return (
        <footer id="footer" className="py-5 fw-normal background-dark">
            <Container className="px-4">
                <p className="my-0 text-center">
                    <span>Bits&Bites</span>
                    <span className="ms-auto"> - Copyright &copy Alexandra Karoline Kästner & David Hermann 2023 - </span>
                    <span>Impressum</span>
                </p>
            </Container>
        </footer>
    )
}

export default Footer