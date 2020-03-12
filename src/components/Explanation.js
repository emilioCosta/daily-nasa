import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ExplanationGrid = styled.div`
  display: flex;
  color: white;
  overflow-wrap: break-word;
  cursor: pointer;
  position: absolute;
  box-shadow: 0 0 5px 3px #333333;
  background-color: black;
  background-size: cover;
  border-radius: 60% 60% 60% 60%;
  width: 500px;
  height: 500px;
  backface-visibility: hidden;
  z-index: 1;
  transform: rotateY(180deg);
  animation: fadein 4s;

  p {
    text-align: center;
    margin: auto;
  }

  @keyframes fadein {
    from { width: 0; height: 0; }
    to   { width: 500px; height: 500px; }
  }
`;

const Explanation = ({ textExplanation }) => {
  const [explanation, setExplanation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setExplanation(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return explanation && <ExplanationGrid><p>{textExplanation}</p></ExplanationGrid>;
};

export default Explanation;