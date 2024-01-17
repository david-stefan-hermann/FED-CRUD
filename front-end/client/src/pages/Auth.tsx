import React from "react"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { ArrowLeftCircleFill } from 'react-bootstrap-icons'
import { Link } from "react-router-dom"


const Auth = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container fluid className="secondary-color" data-bs-theme="dark">
            <Row className="myAuto vh-100 align-items-center justify-content-center">
                <Col sm={6}>
                    <Card className="py-5 my-5 bg-dark">
                        <Stack gap={2} className="mx-5 align-items-center">
                            {children}
                            <hr className="mt-4 mb-3 w-100"></hr>
                            <Link to="/" className="text-decoration-none"><ArrowLeftCircleFill />&nbsp; zurück</Link>
                        </Stack>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth