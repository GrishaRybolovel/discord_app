import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { HashLink } from 'react-router-hash-link';
import React from 'react';

export const Invite = () => {
  const inviteLink = import.meta.env.VITE_DISCORD_INVITE_URL;

  const handleInviteBot = () => {
    window.location.href = inviteLink;
  };

  return (
    <section className="project" id="invite">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Join the community!</h2>
                  <p>Add the bot to your discord server.</p>
                  <span className="navbar-text justify-content-center">
                    <HashLink to='#connect'>
                      <button className="vvd" onClick={handleInviteBot}><span>Invite now</span></button>
                    </HashLink>
                  </span>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
