import styles from '../styles/Sign.module.css'
import ConnectionHeader from './ConnectionHeader'
import { useDispatch, useSelector } from 'react-redux'
import { login, setProfile } from '../reducers/user';
import { useForm } from "react-hook-form";

function SignIn (props) {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors }} = useForm(); 


    const connectToUserAccount = (data) => {
        // destructuring the data object
        const { username, password } = data
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
                dispatch(setProfile())
                reset()
            }
            props.closeModal('signin')
        });
    };
    
    return (
        <div className={styles.signContainer}>
            <p className={styles.title}>Connect to your account</p>
            <form  autoComplete='off' className={styles.formContainer} onSubmit={handleSubmit(connectToUserAccount)}>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Username</p>
                    <input
                        className={styles.inputContainer}
                        type="text"
                        placeholder="Username"
                        {...register("username", {required:'username is required'})}
                    />
                    <p className={styles.fieldError}>{errors.username?.message}</p>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter your password</p>
                    <input
                        className={styles.inputContainer}
                        type="password"
                        placeholder="Password"
                        {...register("password", {required: 'The password is required'})}
                    />
                    <p className={styles.fieldError}>{errors.password?.message}</p>
                </div>
                <button className={styles.registerButton}>Connect</button>
            </form>
        </div>
    )

}

export default SignIn