import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.css';
import { login, logout, restore } from '../../store/slices/AccountSlice';
import { useState } from 'react';

export default function Login(){
    //useSelector : initialState에 있는 항목
    //useDispatch : reducers에 있는 함수들
    // input 창에 아이디와 비밀번호 입력 : useState 2개 양방향 바인딩
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // auth 이름이 있는 슬라이스
    // 리덕스에 설정한 변수들
    const {user, status, error}= useSelector(slice=>slice.auth);
    
    // 리덕스에 설정한 함수들
    const dispatch = useDispatch();
    //dispatch(logout({}));       // {} : action.payload
    //dispatch(login({}));       // {id, pw} : action.payload
    //dispatch(restore({}));       // {} : action.payload

    function onSubmit(event){
        // input에 넣을 거 다 넣고 엔터나 제출버튼 누르면 실행될 함수(form태그 관련)
        // input에 입력한 값을 가져와서 리덕스의 로그인 함수를 실행
        // form태그에서 onSubmit을 하면 페이지가 자동 새로고침이 된다
        // 대신에, 리액트는 새로고침이 없는 SPA 이기때문에 새로고침을 막아야한다
        event.preventDefault();         // 기본 새로고침을 막는다
        dispatch(login({id, pw}));
    }

    return(
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <input type='text' value={id} onChange={(event)=>{setId(event.target.value)}}/>
                <br/>
                <input type='password' value={pw} onChange={(event)=>{setPw(event.target.value)}}/>
                <br/>
                {
                    user ? (
                        <button onClick={()=>{dispatch(logout())}}>로그아웃</button>
                    ) : (
                        <button type='submit'>로그인</button>
                    )
                }
                
            </form>
            
        </div>
    )
}