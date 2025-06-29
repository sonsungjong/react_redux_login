// .css -> .module.css (일반css는 html에서도 사용가능하지만 중복문제가 있어서 module.css로)
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Login from './pages/Login/Login';
import Status from './pages/Status/Status';
import { useDispatch } from 'react-redux';
import { restore } from './store/slices/AccountSlice';
import { useEffect } from 'react';

// 로그인 정보는 리덕스에서 전역으로 보관
export default function App(){
  const dispatch = useDispatch();     // 리덕스의 함수를 사용하기 위해

  useEffect(()=>{
    const user = sessionStorage.getItem('user');
    if(user && user !== "undefined"){
      try{
        const obj_user = JSON.parse(user);
        dispatch(restore(obj_user));    // 새로고침하면 리덕스의 user 정보에 세션스토리지 정보를 넣어준다
      }
      catch(err){
        console.error(err);
      }
    }
  }, [dispatch]);

  return(
    <div className={styles.App}>
      <Link to='/login'>로그인</Link>
      <br/>
      <Link to='/status'>Status</Link>


      {/* 라우츠 - 라우트 : /login => Login.jsx, /status => Status.jsx */}
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace/>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/status' element={<Status />}></Route>
      </Routes>
    </div>
  )
}

// 라이브러리 설치
// npm install react-router-dom @reduxjs/toolkit react-redux
// 페이지 이동 : <BrowserRouter> 로 App 을 감싼다
// Context API : <GlobalState> 같은 ContextAPI를 위한 컴포넌트로 App 을 감싼다
// Redux : <Provider> 로 App 컴포넌트를 감싼다