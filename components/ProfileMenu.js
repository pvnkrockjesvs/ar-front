import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket, faGear, faFileImport } from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/Header.module.css";
import { Popover, Avatar } from "antd";

function ProfileMenu () {
    const ProfileMenuContent = (
        <div >
            <div className={styles.profileMenuItems}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faGear} />
                <p>Edit settings</p>
            </div>
            <div className={styles.profileMenuItems}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faFileImport} />
                <p>Import artist list</p>
            </div>
            <div className={styles.profileMenuItems}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faRightFromBracket} />
                <p>Log-out</p>
            </div>
        </div>
    );
    
    return (
        
        <Popover content={ProfileMenuContent}>
            {profile[0].avatar ?
            (
                <Avatar src={profile[0].avatar} />
            ):
            (
                <Avatar style={{ backgroundColor: '#f56a00' }}>
                    {user.username}
                </Avatar>
            )}
        </Popover>
    )
}

export default  ProfileMenu