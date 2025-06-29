// AccountSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// *비동기*로 리덕스 동작 : async ==> 로그인 정보를 확인받는 동안 화면 멈춤을 방지하기 위해
// 첫번째 인자 : 곂치지않는 고유이름
// 두번째 인자 : 비동기로 실행할 함수
export const login = createAsyncThunk('auth/login', async (data)=>{
    // fetch를 통해서 서버에 정보를 요청
    //const res = await fetch('http://localhost:3000/api/login');     // get요청
    const res = await fetch('http://localhost:3000/api/login', {
        method:'POST',          // 요청방식 POST
        headers: {'Content-Type': 'application/json'},      // JSON 형태로 전달
        body: JSON.stringify(data),                         // JSON 형태로 전달
    });
    
    console.log('서버로 전송: ', data);
    const result = await res.json();
    console.log('서버응답: ',result);

    return result.user;
});
// 비동기로 전송하는 함수 ==> 슬라이스에서 extraRedcuer

// 계정 정보를 처리할 리덕스 툴킷
// 슬라이스를 생성
const slice = createSlice({
    // name, initialState, reducers
    name: "auth",               // 슬라이스의 고유이름
    initialState: {user:null, status:'idle' ,error:null},  // useSelector 로 사용될 변수들
    reducers:{
        // useDispatch 로 사용될 함수들
        // 로그아웃 할때 사용할 함수
        logout(state){
            // state : 이전값(원래값)
            // action : 값을 변경하기 위한 부분
            console.log('로그아웃')
            state.user = null;
            // 세션스토리지에 담긴 정보도 없앤다
            // 로컬스토리지 : 웹꺼도 남아있음(장바구니), 세션스토리지 : 웹끄면 사라짐(로그인 정보)
            sessionStorage.removeItem('user');
        },
        // 세션스토리지에도 계정정보를 보관했다가 새로고침하면 다시 넣어줄
        restore(state, action){
            // state : 이전값(원래값)
            // action : 값을 변경하기 위한 부분
            console.log('새로고침')
            // 세션스토리지의 user에서 값을 받아와서 state를 업데이트
            state.user = action.payload;            // 값을 변경
            console.log()
        }
    },
    extraReducers:(builder)=>{
        // 비동기로 실행되는 함수
        // pending(대기), fulfilled(성공), reject(거절)
        builder.addCase(
            // login 대기일때 사용시킬 함수
            login.pending, (state, action)=>{
                state.status = "loading";
                state.user = action.payload;
            }
        )
        .addCase(
            // login 거절됬을때 사용시킬 함수
            login.rejected,(state, action)=>{
                state.status = "failed"
                state.user = action.payload;
            }
        )
        .addCase(
            // login 성공했을때 사용시킬 함수
            login.fulfilled, (state, action)=>{
                state.status = "success"
                state.user = action.payload;

                // 세션스토리지나 로컬스트로지는 보통 JSON형태로 저장을 한다
                // 로그인 정보는 웹창을 닫았을 때 제거가 되어야하기 때문에 로컬스토리지가 아닌 세션스토리지에 저장
                // 새로고침을 하면 정보가 날라가서 새로고침 완료되면 세션스토리지에서 다시 받아오기
                sessionStorage.setItem('user', JSON.stringify(action.payload));
            }
        )
    }
});

export const {logout, restore} = slice.actions;      // dispatch로 사용하기 위해 export
export default slice.reducer;                        // createSlice한 것의 reducer를 내보낸다