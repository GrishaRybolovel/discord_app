import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faStar, faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons';


export const Features = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="features">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>What is it all about?</h2>
                        <p>Here is a list of features.</p>
                        <Carousel autoPlay={true} autoPlaySpeed={5000} responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                              <FontAwesomeIcon icon={faSmile} />
                              <h5>Add more fun <br/>to your server</h5>
                            </div>
                            <div className="item">
                              <FontAwesomeIcon icon={faStar} />
                              <h5>Unique experience</h5>
                            </div>
                            <div className="item">
                              <FontAwesomeIcon icon={faGamepad} />
                              <h5>Gamification</h5>
                            </div>
                            <div className="item">
                              <FontAwesomeIcon icon={faTrophy} />
                              <h5>Reward your <br/>members</h5>
                            </div>

                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
