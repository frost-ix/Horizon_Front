import axios, { AxiosResponse } from 'axios';
import LikesItem from '../../Interface/LikesInterface';
import accessTokenAxiosConfig from './accessTokenAxios';

const Likes = async (LikesId:String) => {

    const LikesItem:LikesItem = {
        LikesId : LikesId
    }

    try {
      const response: AxiosResponse<{tokenVerify: boolean}> = await accessTokenAxiosConfig.post(`http://jungsonghun.iptime.org:7223/Likes`,LikesItem);
      if(response.data.tokenVerify)
      {
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  export default Likes;