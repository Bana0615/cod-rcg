import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//Helpers
import { implodeObject } from '../helpers/implodeObject';
//Styles
import '../public/styles/components/Loadout.css';

type ClassPerks = {
    perk1: string;
    perk2: string;
    perk3: string;
    perk4: string;
}

type GunAttachments = {
    attach1: string;
    attach2: string;
    attach3: string;
    attach4: string;
    attach5: string;
}

type ClassProps = {
    primary: string;
    p_attachments: GunAttachments;
    secondary: string;
    s_attachments: GunAttachments;
    tactical: string;
    lethal: string;
    perks: ClassPerks;
}

function WarzoneTwoLoadout(props: ClassProps) {
    let p_attachments = implodeObject(props.p_attachments);
    let s_attachments = implodeObject(props.s_attachments);
    const [perks, setPerks] = useState(null);
    const [primary, setPrimary] = useState(null);

    useEffect(() => {
        (async () => {
            await fetch('/api/warzone-two/perks')
                .then(response => response.json())
                .then(perks => setPerks(perks));

            await fetch('/api/modern-warfare-three/primary')
                .then(response => response.json())
                .then(primary => setPrimary(primary));
        })();
    }, []);

    console.log('primary', primary);
    console.log('data21', perks);

    return (
        <>
            <Container id='random-class' className='shadow-lg p-3 mb-5 bg-body rounded'>
                <Row id='weapons'>
                    <Col>
                        <span className='label'>Primary:</span> {primary} <br />
                        <span className='label'>Primary Attachments:</span> {p_attachments}
                    </Col>
                    <Col>
                        <span className='label'>Secondary:</span> {props.secondary} <br />
                        <span className='label'>Secondary Attachments:</span> {s_attachments}
                    </Col>
                </Row>
                <Row>
                    <Col id='equipment'>
                        <span id='tactical'><span className='label'>Tactical:</span> {props.tactical}</span>
                        <span id='lethal'><span className='label'>Lethal:</span> {props.lethal}</span>
                    </Col>
                    <Col>
                        <span className='label'>Perks:</span> {perks}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default WarzoneTwoLoadout;