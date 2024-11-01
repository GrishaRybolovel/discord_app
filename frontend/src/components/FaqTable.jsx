import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import React from 'react';

export const FaqTable = () => {

    const commands = {
        Bugs: [
            {
                command: "How do I report bugs?",
                description: "You can head to our support server, and we have a dedicated channel to reporting bugs called 'report bugs'. Once in there, you send a slash command from the instructions given and moderators can field those bug reports as needed."
            },
            {
                command: "Do I get rewarded for reporting bugs?",
                description: "Depending on the severity, sometimes yes! In the Support Server, you can check the Bug bounty board channel and see if your bug qualifies. If it doesn't, no big deal! Just report it so we can fix it and make your game experience better going forward."
            },
        ],
        Premium: [
            {
                command: "I don't like my membership perks, can I have a refund?",
                description: "As a general rule, we do not offer refunds for memberships. The logic here is that with your membership you're also receiving digital goods that are used/lost with gameplay. If somehow you have not used the digital goods, INCLUDING the temporary multipliers we can talk about a refund, and you can send us an email."
            },
        ]
    };

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <div className="animate__animated animate__fadeIn">
                            <h2>FAQ</h2>
                            <p>The most frequently asked questions can be found below.</p>
                            <Tab.Container id="projects-tabs" defaultActiveKey={Object.keys(commands)[0]}>
                                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                    {Object.keys(commands).map((category, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link eventKey={category}>{category}</Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                                <Tab.Content id="slideInUp" className="animate__animated animate__slideInUp">
                                    {Object.keys(commands).map((category, index) => (
                                        <Tab.Pane eventKey={category} key={index}>
                                            <h3>{category}</h3>
                                            <Row>
                                                {commands[category].map((command, index1) => (
                                                    <ProjectCard command={command} category={category} index={index} />
                                                ))}
                                            </Row>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2}></img>
        </section>
    )
}