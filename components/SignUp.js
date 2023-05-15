import styles from '../styles/SignUp.module.css'
import Header from './Header'
import { useState } from 'react'
import Link from 'next/link';


function SignUp () {

    const [signUpUser, setSignUpUser] = useState(null)
    const [signUpPassword, setSignUpPassword] = useState(null)

    
    return (

        <div className={styles.signupScreen}>
            <Header />
            <div className={styles.signupContainer}>
                <p className={styles.title}>Connect to your account</p>
                <div className={styles.signupInfo}>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Email adress or username</p>
                        <input type="text" placeholder="Email or username" className={styles.inputContainer} onChange={(e) => setSignUpUser(e.target.value)} value={signUpUser} />
                    </div>
                    <div className={styles.itemInfo}>
                        <p className={styles.fieldTitle}>Enter your password</p>
                        <input type="password" placeholder="Password" className={styles.inputContainer} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
                    </div>
                </div>
                <button className={styles.registerButton} onClick={() => handleRegister()}>Connect</button>
                <Link href="/">
                    <span className={styles.passwordLink}>Forget my password</span>
                </Link>
            </div>
        </div>
    )

}

export default SignUp