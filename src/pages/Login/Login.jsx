import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';
import { login, logout, restore } from '../../store/slices/AccountSlice';

export default function Login(){
    //useSelector : initialState에 있는 항목
    //useDispatch : reducers에 있는 함수들

    // auth 이름이 있는 슬라이스
    // 리덕스에 설정한 변수들
    const {user, status, error}= useSelector(slice=>slice.auth);
    
    // 리덕스에 설정한 함수들
    const dispatch = useDispatch();
    //dispatch(logout({}));       // {} : action.payload
    //dispatch(login({}));       // {id, pw} : action.payload
    //dispatch(restore({}));       // {} : action.payload

    return(
        <div className={styles.container}>
            login 페이지 입니다
            <br/>
            {status}
        </div>
    )
}