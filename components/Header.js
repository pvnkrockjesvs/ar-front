import styles from '../styles/Header.module.css'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

function Header() {

    const [connected, setConnected] = useState(true)

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <input
                className={styles.messageContainer} type="text"
                placeholder='Search artist' />
            </div>
            <div className={styles.title}>
                <span class="text">Album Release</span>
            </div>            
            <div className={styles.headerRight}>
            { connected ?
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
                        <Link href='/SignUp'>
                            <button className={styles.button}>SignUp</button>
                        </Link>
                    </div>
                    <div className={styles.linkContainer}>
                        <Link href='/SignIn'>
                            <button className={styles.button}>SignIn</button>
                        </Link>
                    </div>
                </>
            )}
            </div>
        </header>
    )
}

export default Header