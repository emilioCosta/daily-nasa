import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Playlist from 'react-mp3-player';
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

  useEffect(async () => {
    const result = await getNasaInfo();
    setData(result.data);
    new CircleType(document.getElementById('title')).radius(330);
  }, []);
  const tracks = [{ name:'', desc: 'Description 1', src:''}]
  return <>
    <h2 id="title">
      {(data.title || 'NASA').toUpperCase()}
    </h2>
    {data.media_type === 'image' && 
      <Container onClick={() => setFlip(!flip)} flip={flip ? 1 : 0}>
        <Image url={data.url} />
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