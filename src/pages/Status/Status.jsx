import { useSelector } from 'react-redux';
import styles from './Status.module.css';

export default function Status(){
    // 리덕스의 state를 가져온다
    const {user, status, error}= useSelector((state)=>{return state.auth});

    return(
        <div className={styles.container}>
            <h2>{user.name} 접속 중</h2>
        </div>
    )
}
