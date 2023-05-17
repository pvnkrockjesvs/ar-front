import styles from '../styles/Header.module.css'

function ConnectionHeader(props) {
    
    const handleClick = (buttonType) => {
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
            <div className={styles.navMenu}>
                <button type="primary" className={styles.signupButton} onClick={(e) => handleClick('signup')}>Create an account</button>
                <button type="primary" className={styles.signinButton} onClick={(e) => handleClick('signin')}>Connection</button>
            </div>
        </header>
    )
}

export default ConnectionHeader