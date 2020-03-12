import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CustomImage = styled.img`
  cursor: pointer;
  position: absolute;
  box-shadow: 0 0 5px 3px #333333;
  background: url(${({url}) => url});
  background-size: cover;
  border-radius: 60% 60% 60% 60%;
  width: 500px;
  height: 500px;
  backface-visibility: hidden;
  z-index: 2;
  animation: fadein 4s;

  @keyframes fadein {
    from { width: 0; height: 0; }
    to   { width: 500px; height: 500px; }
  }

  @keyframes pulse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

const Image = ({ url }) => {
  const [image, setImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return image && <CustomImage url={url} />;
};

export default Image;