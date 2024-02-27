import axios, { AxiosResponse } from 'axios';
import LikesItem from '../../Interface/LikesInterface';

const Likes = async (LikesId:String, userId:String) => {

    const LikesItem:LikesItem = {
        LikesId : LikesId,
        userId : userId
    }

    try {
      const response: AxiosResponse<{success: boolean}> = await axios.post(`http://jungsonghun.iptime.org:7223/Likes`,LikesItem);
      if(response.data.success)
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