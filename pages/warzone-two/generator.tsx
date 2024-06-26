import { Container, Row, Col } from 'react-bootstrap';
import Header from '@/components/Header';

export default function WarzoneTwo() {
    return <>
        <Header />
        <Container fluid>
            <Row>
                <Col>
                    <p>Warzone 2 - Random Class Generator</p>
                </Col>
            </Row>
        </Container>
    </>;
}