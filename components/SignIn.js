import styles from '../styles/SignUp.module.css'
import Header from './Header'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignIn () {

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [emailError, setEmailError] = useState(null);


    const handleOnChange = (event) => {
        if (EMAIL_REGEX.test(event.target.value)) {
            setEmail(event.target.value)
            setEmailError(false)
        } else {
            setEmailError(true);
        }    
    }
    
    return (

        <div className={styles.signupScreen}>
            <Header />
            <div className={styles.signupContainer}>
                <p className={styles.title}>Create your account</p>
                <div className={styles.signupInfo}>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Enter a valid username</p>
                        <input type="text" placeholder="Username" className={styles.inputContainer} onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Enter a valid email adress </p>
                        <input type="text" placeholder="Email" className={styles.inputContainer} onChange={(e) => handleOnChange(e)} value={email} />
                        {emailError && <div className={styles.emailError}>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <p className={styles.emailErrorMessage}>Invalid email address</p>
                        </div>
                        }
                    </div>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Create a password</p>
                        <input type="password" placeholder="Password" className={styles.inputContainer} onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <button className={styles.registerButton} onClick={() => handleRegister()}>Create</button>
            </div>
        </div>
    )

}

export default SignIn