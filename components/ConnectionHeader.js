import styles from '../styles/Header.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Modal } from "antd";

function ConnectionHeader(props) {

    //const user = useSelector((state) => state.user.value);
    //const [connected, setConnected] = useState(false)
    
    const handleClick = (buttonType) => {
        console.log(buttonType)
        props.selectSignOption(buttonType)
    }
  
    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <input
                className={styles.messageContainer} type="text"
                placeholder='Search artist' />
            </div>
            <div className={styles.title}>
                <span>Album Release</span>
            </div>            
            <div className={styles.connectionButtons}>
                <button type="primary" className={styles.signupButton} onClick={(e) => handleClick('signup')}>Create an account</button>
                <button type="primary" className={styles.signinButton} onClick={(e) => handleClick('signin')}>Connection</button>
            </div>
        </header>
    )
}

export default ConnectionHeader