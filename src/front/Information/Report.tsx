import ReportItem from "../../Interface/ReportInterface";
import axios, { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from "./accessTokenAxios";

const report = async (reportId:String) => {
    const reportText:String|null = window.prompt("신고 내용을 입력해주세요.");

    if (reportText === null) {
      return;
    }

    const reportItem:ReportItem={
      reportId:reportId,
      reportText:reportText
    }

    try {
      const response: AxiosResponse<{tokenVerify: boolean}> = await accessTokenAxiosConfig.post(`http://jungsonghun.iptime.org:7223/report`,reportItem);
      if(response.data.tokenVerify)
      {
        alert("신고가 완료되었습니다.")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  export default report;