import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Popover, Avatar, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { deleteProfile } from '../reducers/profile'
import { TextField } from "@material-ui/core";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import Profile from '../components/Profile'

function UserHeader() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    // This is for the popover to be closed once we select an item
    const [open, setOpen] = useState(false);

    const profile = useSelector((state) => state.profile.value);
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if (value) {
            console.log(value);
        }
        setTimeout(() => {
            if (value.length > 2) {
                fetch(`http://localhost:3000/artists/search/${value}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setOptions(data.artists.name);
                })
                .catch((error) => {
                    console.error("Error fetching data 1:", error);
                });
            }
        }, 1000); // Ajouter une pause de 1 seconde (1000 millisecondes) avant cette requête
    }, [value]);

    //Fonction après appuie sur la touche entrée dans input text
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && value) {
            router.push(`/search/${value}`);
            console.log("Recherche effectuée avec la valeur :", value);
        }
    };

    const handleLogoutClick = () => {
        console.log('DELEATE THE USER FROM THE STORE')
        dispatch(logout)
        dispatch(deleteProfile)
        //setOpen(false)
        router.push("/home");
        console.log('OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
    }

    const handleProfileCancel = () => {
        setProfileModalOpen(false)
    }

    const openProfileModal = () => {        
        setProfileModalOpen(true)
        //setOpen(false)
        
    }

    const closeModal = () => {
        setProfileModalOpen(false)
    }

    const handleOk = () => {
        setProfileModalOpen(false);
    };

    const handleOpenChange = () => {
        setOpen(!open)   
    }

    const ProfileMenuContent = (
        <div >
            <>
                <div className={styles.profileMenuItems}>
                    <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
                    <p onClick={() => openProfileModal()}>Settings</p>                
                </div>
                <div id="react-modals">
                    <Modal
                        className="modalStyle"
                        width={700}
                        open={isProfileModalOpen}
                        footer={null}>
                        <Profile closeModal={closeModal} />
                    </Modal>
                </div>
            </>
            <div className={styles.profileMenuItems}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
                <p>Import artist list</p>
            </div>
            <div className={styles.profileMenuItems}>
                <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
                <p onClick={handleLogoutClick}>Log-out</p>
            </div>
        </div>
    );

    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                {/* <Autocomplete
                id="search-artist"
                sx={{ width: 400, backgroundColor: "rgb(55, 165, 35)" }}
                filterOptions={(x) => x}
                options={options}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                renderInput={(params) => (
                <TextField
                    className={styles.textInput}
                    {...params}
                    label="🔎 Search artist"
                    variant="outlined"
                    />
                )}
                /> */}
                <input
                    className={styles.messageContainer}
                    type="text"
                    placeholder="🔎 Search artist"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </div>
            <div className={styles.title}>
                <span>Album Release</span>
            </div>
            <div className={styles.navMenu}>
                <div className={styles.linkContainer}>
                    <Link href="/calendar">
                        <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
                    </Link>
                    <Link href="/calendar">
                        <span className={styles.linkText}>Calendar</span>
                    </Link>
                </div>
                <div className={styles.linkContainer}>
                    <Link href="/home">
                        <FontAwesomeIcon className={styles.linkIcon} icon={faHome} />
                    </Link>
                    <Link href="/home">
                        <span className={styles.linkText}>Home</span>
                    </Link>
                </div>
            <div className={styles.linkContainer}>
                {/*<FontAwesomeIcon className={styles.linkIcon} icon={faUser} />*/}
                <Popover content={ProfileMenuContent}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}>
                    {/*
                    {profile[0].avatar ?
                    (
                        <Avatar src={profile[0].avatar} />
                    ):
                    (
                    */}
                        <Avatar style={{ backgroundColor: '#f56a00' }}>
                            {user.username}
                        </Avatar>
                    
                </Popover>
                {/*<ProfileMenu />*/}
                {/*}
                <Popover content={ProfileMenuContent} overlayClassName={styles.profileMenueContainer}>
                    <Button className={styles.linkText} type="primary">Profile</Button>
                </Popover>
                >Popover
                    title="Filter types"
                    content={popoverContent}
                    className={styles.popover}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}>
                    <Typography sx={{ p: 2 }}>
                        <ProfileMenu />
                    </Typography>
                </Popover>
            */}
            </div>
        </div>
    </header>
  );
}

export default UserHeader;
