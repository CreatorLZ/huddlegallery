import React from "react";
import styled from "styled-components";
import "./animations.css";

const SkeletonContainer = styled.div`
 display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 images per row */
  gap: 10px;
  padding: 5px 5px;
  @media only screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
  }
`;

const SkeletonImage = styled.div`
 width: 350px;
  height: auto; /* Maintain the aspect ratioo of the images */
  background: #ebe1e1;
  object-fit: cover;
  max-height: 350px;
  min-height: 250px;
  position: relative;
  animation: loadingAnimation 1s infinite; 

  @media only screen and (max-width: 420px) {
    max-height: 200px;
    min-height: 150px;
    width: 100%;
  }
`;

const Skeletonloader = ({ count }) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <SkeletonImage key={index} />
  ));

  return <SkeletonContainer>{skeletonItems}</SkeletonContainer>;
};

export default Skeletonloader;
