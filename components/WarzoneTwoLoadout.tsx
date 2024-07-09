import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//Helpers
import { implodeObject } from '../helpers/implodeObject';
import { fetchWeapon } from '../helpers/fetchWeapon';
import { fetchPerks } from '../helpers/fetchPerks';
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
    const weapon = { name: '', type: '', game: '', no_attach: false };
    let p_attachments = implodeObject(props.p_attachments);
    let s_attachments = implodeObject(props.s_attachments);
    const [perks, setPerks] = useState(null);
    const [primary, setPrimary] = useState(weapon);
    const [secondary, setSecondary] = useState(weapon);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const perks = await fetchPerks();
                setPerks(perks);

                const primaryWeapon = await fetchWeapon('primary');
                setPrimary(primaryWeapon);
            } catch (error: any) {
                console.error(error.message); // Handle errors centrally
            }
        };

        fetchData();
    }, []);

    console.log('primary', primary);
    console.log('data21', perks);

    return (
        <>
            <Container id='random-class' className='shadow-lg p-3 mb-5 bg-body rounded'>
                <Row id='weapons'>
                    <Col>
                        <span className='label'>Primary:</span> {primary.name} - {primary.game} <br />
                        {primary.no_attach ? (
                            // No attachments case: Display "No Attachments" or a custom message
                            <><span className='label'>Primary Attachments: </span> No Attachments</>
                        ) : (
                            // Attachments case: Display the existing logic for attachments
                            <><span className='label'>Primary Attachments:</span> {p_attachments}</>
                        )}

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