import styles from '../styles/Sign.module.css'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user';
import { useForm } from "react-hook-form";


function SignUp (props) {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors }  } = useForm();

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
                props.closeModal('signup')
            }            
        });
    };

    return (
        <div className={styles.signContainer}>
            <p className={styles.title}>Create your account</p>                
            <form  autoComplete='off' className={styles.formContainer} onSubmit={handleSubmit(CreateUserAccount)}>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a valid username</p>
                    <input
                        type='text'
                        className={styles.inputContainer}
                        placeholder="Name"
                        {...register("username", {required: 'The username is required'})}                      
                    />
                    <p className={styles.fieldError}>{errors.username?.message}</p>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a valid email address</p>
                    <input
                        className={styles.inputContainer}
                        type='email'
                        placeholder="Email"
                        {...register("email", {
                            required: 'email is required',
                            pattern: {value: EMAIL_REGEX,
                                      message: 'The required email shoud be valid'
                                     }
                                }
                        )}                      
                    />
                    <p className={styles.fieldError}>{errors.email?.message}</p>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.fieldTitle}>Enter a password</p>
                    <input
                        type="password"
                        className={styles.inputContainer}
                        placeholder="Password"
                        {...register("password", {required: 'password is required'})}                      
                    />
                    <p className={styles.fieldError}>{errors.password?.message}</p>
                </div>
                <button className={styles.registerButton}>Create</button>
            </form>
        </div>
    )

}

export default SignUp