import axios from 'axios';

export const  getNasaInfo = () => {
  return axios.get('https://api.nasa.gov/planetary/apod?api_key=3Y4LUMMgcVLsrMgDie1gFLcf5okBmVBeg8W6cTdQ&hd=true');
}