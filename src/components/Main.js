import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircleType from 'circletype';
import { getNasaInfo } from '../api.js';
import Explanation from './Explanation.js';
import Image from './Image.js';

const Copyright = styled.h4`
  position: absolute;
  color: #ffffff;
  bottom: 0px;
  right: 25px;
`;

const Container = styled.div`
  transition: transform 4s ease-in-out;
  transform-style: preserve-3d;
  position: absolute;
  display: flex;
  top: 50%;
  transform: rotateY(${({ flip }) => flip ? '1980deg' : '0deg'});
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  justify-content: center;
  align-items: center;
`;

const Video = styled.iframe`
  cursor: pointer;
  position: absolute;
  box-shadow: 0 0 5px 3px #333333;
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

const Main = () => {
  const [flip, setFlip] = useState(false);
  const [data, setData] = useState({
    title: '',
    explanation: '',
    url: '',
    media_type: '',
    copyright: '',
    date: '',
  });

  useEffect(() => {
    const f = async () => {
      const result = await getNasaInfo();
      setData(result.data);
      new CircleType(document.getElementById('title')).radius(330);
    };
    f();
  }, []);

  return <>
    <h2 id="title">
      {(data.title || 'NASA').toUpperCase()}
    </h2>
    {data.media_type === 'image' ? 
      <Container onClick={() => setFlip(!flip)} flip={flip ? 1 : 0}>
        <Image url={data.url} />
        <Explanation textExplanation={data.explanation} />
      </Container>
    :
      <Container onClick={() => setFlip(!flip)} flip={flip ? 1 : 0}>
        <Video src={`${data.url}&controls=0&loop=1&playlist=${data.url.substring(data.url.lastIndexOf('embed/')+6, data.url.lastIndexOf('?'))}`} />
        <Explanation textExplanation={data.explanation} />
      </Container>
    }
    <Copyright>{(data.copyright || 'NASA').toUpperCase()}</Copyright>
    <audio autoPlay>
      <source src="./Interstellar.mp3" type="audio/mpeg" />
    </audio>
  </>;
};

export default Main;