import styles from '../styles/Header.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Header() {

    const user = useSelector((state) => state.user.value);
    const [connected, setConnected] = useState(false)

    const openSignInModal = () => {
        setSignInModalOpen(true);
    };
  
    const handleSignInCancel = () => {
        setSignInModalOpen(false);
    };
  
    const openSignUpModal = () => {
        setSignUpModalOpen(true);
    };
  
    const handleSignUpCancel = () => {
        setSignUpModalOpen(false);
    };
  
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
            <div className={styles.headerRight}>
            { user.token ?
            (   <>
                    <div className={styles.linkContainer}>
                        <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
                        <Link href="/">
                            <span className={styles.linkText}>Calendar</span>
                        </Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <FontAwesomeIcon className={styles.linkIcon} icon={faHome} />
                        <Link href="/">
                            <span className={styles.linkText}>Home</span>
                        </Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <FontAwesomeIcon className={styles.linkIcon} icon={faUser} />
                        <Link href="/">
                            <span className={styles.linkText}>Profil</span>
                        </Link>
                    </div>
                </>
            ) :
            (   <>
                    <div className={styles.linkContainer}>
                        <button type="primary" className={styles.signButton} onClick={openSignUpModal}>Sign-Up</button>
                    </div>
                    <div className={styles.linkContainer}>
                        <Link href='/SignIn'>
                            <button className={styles.button}>LogIn</button>
                        </Link>
                    </div>
                </>
            )}
            </div>
        </header>
    )
}

export default Header