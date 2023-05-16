import styles from '../styles/SignUp.module.css'
import ConnectionHeader from './ConnectionHeader'
import { useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/user';

function SignIn (props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleConnection = () => {
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.result) {
                dispatch(login({ username, token: data.token }));
                setUserName('');
                setPassword('');
            }
            props.closeModal('signin')
        });
    };
    
    return (
        <div>
            <div className={styles.signupContainer}>
                <p className={styles.title}>Connect to your account</p>
                <div className={styles.signupInfo}>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Email adress or username</p>
                        <input type="text" placeholder="Email or username" className={styles.inputContainer} onChange={(e) => setUserName(e.target.value)} value={username} />
                    </div>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Enter your password</p>
                        <input type="password" placeholder="Password" className={styles.inputContainer} onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <button className={styles.registerButton} onClick={() => handleConnection()}>Connect</button>
                </div>
            ) : 
            }
        </div>
    )

}

export default SignIn