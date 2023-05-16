import styles from '../styles/Sign.module.css'
import Header from './Header'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user';
import { useForm } from "react-hook-form";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function SignUp (props) {

    const dispatch = useDispatch();
    const [userExistError, setUserExistError] = useState(false)
    const { register, handleSubmit, reset } = useForm();

    const handleOnChange = (event) => {
        if (EMAIL_REGEX.test(event.target.value)) {
            setEmail(event.target.value)
            setEmailError(false)
        } else {
            setEmailError(true);
        }    
    }

    const CreateUserAccount = (data) => {
        // destructuring the data object
        const { username, email, password } = data
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.result) {
                dispatch(login({ username, token: data.token }))
                // reset the value of the form to the defautl values
                reset()          
                // reverse data flow to close the signup model
            }
            props.closeModal('signup')
            /*else {
                setUserExistError(true)
            }
            */
            
        });
    };

    return (
        <div className={styles.signupContainer}>
            <p className={styles.title}>Create your account</p>                
            <form  className={styles.formContainer} onSubmit={handleSubmit(CreateUserAccount)}>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a valid username</p>
                    <input
                        type='text'
                        className={styles.inputContainer}
                        placeholder="Name........................"
                        {...register("username")}                      
                    />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a valid email address</p>
                    <input
                        className={styles.inputContainer}
                        type='email'
                        placeholder="Email"
                        {...register("email")}                      
                    />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a password</p>
                    <input
                        type="password"
                        className={styles.inputContainer}
                        placeholder="Password"
                        {...register("password")}                      
                    />
                </div>
                <button className={styles.registerButton}>Create</button>
            </form>
            {/*}
            {userExistError &&
             <div>
                <span className={styles.userError}> You already have an account </span>
            </div>
            }*/}
        </div>
    )

}

export default SignUp