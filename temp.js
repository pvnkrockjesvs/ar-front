import styles from '../styles/SignUp.module.css'
import Header from './Header'
import { useState } from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'

function SignUp () {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);


    const handleConnection = () => {
        fetch("http://ar-back-git-main-pvnkrockjesvs.vercel.app/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                dispatch(login({ username, firstname, token: data.user.token }));
                setUserName(null);
                setPassword(null);
            }
        });
    };
    
    return (

        <div className={styles.signupScreen}>
            <Header />
            { !user.token ?
            (
                <div className={styles.signupContainer}>
                    <p className={styles.title}>Connect to your account</p>
                    <div className={styles.signupInfo}>
                        <div className={styles.itemInfo}>
                            <p className={styles.fieldTitle}>Email adress or username</p>
                            <input type="text" placeholder="Email or username" className={styles.inputContainer} onChange={(e) => setUserName(e.target.value)} value={signUpUser} />
                        </div>
                        <div className={styles.itemInfo}>
                            <p className={styles.fieldTitle}>Enter your password</p>
                            <input type="password" placeholder="Password" className={styles.inputContainer} onChange={(e) => setPassword(e.target.value)} value={signUpPassword} />
                        </div>
                    </div>
                    <button className={styles.registerButton} onClick={() => handleConnection()}>Connect</button>
                    <Link href="/">
                        <span className={styles.passwordLink}>Forget my password</span>
                    </Link>
                </div>
            ) :
            (
                <>
                </>
            )
            }
        </div>
    )

}

export default SignUp