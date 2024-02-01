import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Image from "react-bootstrap/esm/Image"


const About = () => {
    
    return (
        <Container className="my-4">
            <Row className="align-items-center py-3">
                <Col md={6}>
                    <Image 
                        src="/about.png" 
                        alt="About"
                        style={{ width: '100%' }}
                    ></Image>
                </Col>
                <Col md={6}>
                    <h2>Über uns</h2>
                    <p>Herzlich willkommen auf unserer Webseite, dem gemütlichen Treffpunkt für IT-Studenten mit einer 
                        Leidenschaft fürs Kochen! Wir sind stolz darauf, eine bunte Palette an kreativen und leckeren 
                        Rezepten zu präsentieren, die von unseren talentierten IT-Studenten kreiert wurden.</p>
                    <p>Unsere Rezepte sind nicht nur eine Freude für den Gaumen, sondern auch eine Hommage an die Welt der 
                        Informationstechnologie. Tritt ein, lass dich inspirieren und entdecke, wie Technik und Kulinarik 
                        auf köstliche Weise verschmelzen können!</p>
                    <Link to="/Rezepte"><Button variant="primary">Sieh dir unsere Rezepte an!</Button></Link>
                </Col>
            </Row>
            <Row className="align-items-center py-3">
                <Col md={6}>
                    <h2>IT-Lachs</h2>
                    <p>Die Verbindung von IT-Elementen und Essen öffnet die Tür zu einer Welt, in der Kreativität und 
                        Innovation Hand in Hand gehen. Auf der einen Seite symbolisiert Essen Kultur, Tradition und die 
                        Freude am Leben. Es ist eine Kunstform, die unsere Sinne anspricht und uns auf eine Reise der 
                        Geschmäcke und Aromen mitnimmt. Auf der anderen Seite steht die Informationstechnologie (IT) für 
                        Fortschritt, Effizienz und die ständige Evolution unserer Gesellschaft.</p>
                        <p>IT revolutioniert die Art 
                        und Weise, wie wir leben, arbeiten und kommunizieren. Die Verschmelzung dieser beiden Bereiche 
                        schafft eine faszinierende Harmonie: Während Essen die emotionale und sinnliche Seite des Lebens 
                        repräsentiert, bringt die IT eine dynamische und innovative Komponente mit ein. Diese Kombination 
                        ermöglicht nicht nur einen kreativen Ausdruck, sondern fördert auch neue Möglichkeiten in der 
                        Gastronomie, wie z.B. die Verwendung von High-Tech-Kochgeräten, die Präzision und Konsistenz in 
                        der Zubereitung von Speisen bringen, oder innovative Präsentationsformen, die das Esserlebnis in 
                        etwas Einzigartiges verwandeln.</p>
                    <p>Darüber hinaus spiegelt die Kombination von IT und Essen den Geist unserer zeitgenössischen Gesellschaft 
                        wieder, in der Technologie ein integraler Bestandteil des täglichen Lebens ist. Durch die Einbeziehung 
                        von IT in die kulinarische Welt eröffnen sich neue Horizonte für personalisierte Ernährung und digitale 
                        Ernährungsberatung, was zu einem gesünderen Lebensstil führen kann. Apps und Plattformen, die Ernährungsdaten 
                        analysieren und anpassen, sind nur ein Beispiel dafür, wie IT das Essverhalten positiv beeinflussen kann. 
                        Zudem ermöglicht die Technologie in der Gastronomie eine effizientere Verwaltung von Ressourcen, verringert 
                        Lebensmittelverschwendung und fördert nachhaltige Praktiken. In einer Welt, in der die Grenzen zwischen 
                        digital und real zunehmend verschwimmen, bietet die Verbindung von IT und Essen eine spannende Perspektive, 
                        wie Technologie unsere grundlegendsten menschlichen Erfahrungen bereichern und transformieren kann.</p>
                    <a href="/Threejs"><Button variant="primary">Weitere Projekte</Button></a>
                </Col>
                <Col md={6}>
                    <Image 
                        src="/it-lachs.png" 
                        alt="IT Lachs"
                        style={{ width: '100%' }}
                    ></Image>
                </Col>
            </Row>
        </Container>
    );
};

export default About
