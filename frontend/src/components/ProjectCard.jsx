import { Col } from "react-bootstrap";
import React from 'react';

const generateColor = (index) => {
  const hue = (index + 1) * 137.5; // 137.5 is a random number to generate different hues
  return `linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue + 30}, 100%, 50%))`;
};

export const ProjectCard = ({ command, category, index }) => {


  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <h4>{command.command}</h4>
        <span style={{ background: generateColor(index), padding: '5px', borderRadius: '5px', color: 'white' }}>{category}</span>
        <div className="proj-txtx">
          <span>{command.description}</span>
        </div>
      </div>
    </Col>
  )
}
