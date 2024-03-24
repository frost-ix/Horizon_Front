import { useCallback, useEffect, useState } from 'react';
import './css/BookList.css';
import { AxiosResponse } from 'axios';
import accessTokenAxiosConfig from '../../Information/accessTokenAxios';
import { useNavigate, useLocation } from 'react-router-dom';
import BookListItem from '../../../Interface/BookListInterface';
import Loading from '../../Information/Loading';

function BookList() {
  const location = useLocation();
  const navigate = useNavigate();
  const department = location.state.department || "error";
  const name = location.state.name || "error";
  const [bookList, setBookLIst] = useState<BookListItem[]>([]);
  const [sort, setSort] = useState<boolean>(false);

  const getBookListAxios = useCallback(async () => {
    try {
      const response: AxiosResponse<{tokenVerify: boolean, bookList: BookListItem[]}>
      = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/book/list/${department}`);
      if(response.data.tokenVerify)
      {
        setBookLIst(response.data.bookList);
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[]) 

  useEffect(()=>{
    getBookListAxios();
  },[])
  
  return (
    <div className="BookList">
      <div className="BookList-header"><span>{name} 책방</span> <div className="BookList-header-sort" onClick={()=>setSort(!sort)}>솔트</div></div>
      {bookList.length > 0 ?(
        <>
        {sort?(
          bookList.map((item, index) => (
            <div className='center'>
            <div key={index} className='BookList-mapDiv'>
              <div className='BookList-mapDiv-left'>
                <div className='BookList-mapdiv-title'>
                  <span className='BookList-mapDiv-title-span'>판매</span> {item.title}
                </div>
                <div className='BookList-mapdiv-price-v2'>{item.price.toString()}원</div>
                <div className='BookList-mapdiv-data'>
                  {item.writer}  
                  <span className='BookList-mapdiv-data-span'>{item.createAt.toString().substring(5, 10)}</span>
                  <span className='BookList-mapdiv-data-span'>조회 {item.hit}</span>
                </div>
              </div>
              <img src={item.imageUrl} alt="" className='BookList-mapDiv-img' />
            </div>
            <div className='BookList-mapDiv-line'></div>
            </div>
          ))
          ):(
            <div className='BookList-mapDiv-v2-flex'>
            {bookList.map((item, index) => (
              <div key={index} className='BookList-mapDiv-v2'>
                <img src={item.imageUrl} alt="" className='BookList-mapDiv-img-v2' />
                <div className='BookList-mapdiv-data-v2'>
                  <div className='BookList-mapdiv-title-v2'><span className='BookList-mapDiv-title-span'>판매</span> {item.title}</div>
                  <div className='BookList-mapdiv-price-v2'>{item.price.toString()}원</div>
                  <div className='BookList-mapdiv-date-v2'>{item.createAt.toString().substring(5, 10)}</div>
                </div>
              </div>
            ))}
            </div>
          )}
        </>
      ):(
        <Loading/>
        )}
    </div>
  );
}

export default BookList;

