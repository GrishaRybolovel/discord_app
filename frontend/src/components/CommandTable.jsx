import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import React from 'react';
import 'animate.css';

export const CommandTable = () => {

    const commands = {
        Fun: [
            {
                command: "/manage",
                description: "for fun"
            },
            {
                command: "/manage",
                description: "for fun"
            },
        ],
        Game: [
            {
                command: "/manage",
                description: "for fun"
            },
            {
                command: "/manage",
                description: "for fun"
            },
        ],
        Settings: [
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help",
                description: "for fun"
            },
            {
                command: "/help help help help help help",
                description: "for fun"
            },
        ],
    };

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <div className="animate__animated animate__fadeIn">
                            <h2>Commands</h2>
                            <p>Browse all commands available in the bot.</p>
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