import styles from '../styles/SignUp.module.css'
import Header from './Header'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp (props) {

    const dispatch = useDispatch();
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false);


    const handleOnChange = (event) => {
        if (EMAIL_REGEX.test(event.target.value)) {
            setEmail(event.target.value)
            setEmailError(false)
        } else {
            setEmailError(true);
        }    
    }

    const handleRegister = () => {
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                console.log(data)
                dispatch(login({ username, token: data.token }))
                setUserName('');
                setEmail('');
                setPassword('');
            }
            props.closeModal('signup')

        });
    };

    return (
        <div className={styles.signupContainer}>
            <p className={styles.title}>Create your account</p>
            <div className={styles.signupInfo}>
                <div className={styles.itemInfo}>
                    <p className={styles.fieldTitle}>Enter a valid username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        id='username'
                        className={styles.inputContainer}
                        onChange={(e) => setUserName(e.target.value)}
                        value={username} />
                </div>
                <div className={styles.itemInfo}>
                    <p className={styles.fieldTitle}>Enter a valid email adress </p>
                    <input
                        type="text"
                        placeholder="Email"
                        id='email'
                        className={styles.inputContainer}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    {/*}
                    {emailError && <div className={styles.emailError}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                        <p className={styles.emailErrorMessage}>Invalid email address</p>
                    </div>
                    }
                    */}
                </div>
                <div className={styles.itemInfo}>
                    <p className={styles.fieldTitle}>Create a password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        id='password'
                        className={styles.inputContainer}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                </div>
            </div>
            <div>
                <button className={styles.registerButton} onClick={() => handleRegister()}>Create</button>
            </div>
        </div>
    )

}

export default SignUp