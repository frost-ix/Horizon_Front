import './css/BookList.css';
import { useNavigate, useLocation } from 'react-router-dom';


function BookList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const department = queryParams.get('department');
  
  return (
    <div className="BookList">

    </div>
  );
}

export default BookList;
