import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "./SearchInput";
import { useRouter } from "next/router";
import { Dropdown, Navbar, Avatar, Button, Modal, Label } from "flowbite-react";
import LastFmModal from "./LastFmModal";
import ProfilModale from "./ProfileModal";
import { AiOutlineHome, AiFillCalendar } from "react-icons/ai";
import { logout } from "../reducers/user";
import { deleteProfile } from "../reducers/profile";

function UserHeader() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const profile = useSelector((state) => state.profile.value);
  const user = useSelector((state) => state.user.value);
  const [avatar, setAvatar] = useState();
  const [lfModal, setLfModal] = useState(false);
  const loading = open && options.length === 0;

  const dispatch = useDispatch();

  const toggleLfModal = () => setLfModal(!lfModal);
  // const letters =
  //     user.username.charAt(0).toUpperCase() +
  //     user.username.charAt(1).toUpperCase();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(deleteProfile());
    router.push("/home");
  };

  return (
    <Navbar
      className="bg-white border-gray-200  items-center w-full dark:bg-gray-900"
      fluid={true}
      rounded={true}
    >
      <div>
        <SearchInput />
      </div>
      <div className={styles.title}>
        <Navbar.Brand href="/">Album Release</Navbar.Brand>
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">
          <AiOutlineHome className="h-11 w-10" />
        </Navbar.Link>
        <Navbar.Link href="/calendar">
          <AiFillCalendar className="h-11 w-10" />
        </Navbar.Link>
        <Dropdown
          label={
            <Avatar
              alt="User settings"
              className="h-11 w-11 mr-3"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Item onClick={toggleLfModal}>Import</Dropdown.Item>
          <LastFmModal
            show={lfModal}
            dismissible={true}
            onClose={toggleLfModal}
          />
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              handleLogOut();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
    // <header className={styles.header}>
    //   <div className={styles.searchContainer}>

    //     <input type="text" onKeyDown={handleKeyDown}
    //         onChange={(e) => setValue(e.target.value)}
    //         value={value}
    //         class="block p-2.5 w-full z-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         placeholder="🔎 Search artist" required/>

    //     {/* <input
    //       className={styles.messageContainer}
    //       type="text"
    //       placeholder="🔎 Search artist"
    //       onKeyDown={handleKeyDown}
    //       onChange={(e) => setValue(e.target.value)}
    //       value={value}
    //     /> */}
    //   </div>
    //   <div className={styles.title}>
    //     <span>Album Release</span>
    //   </div>
    //   <div className={styles.navMenu}>
    //     <div className={styles.linkContainer}>
    //       <FontAwesomeIcon className={styles.linkIcon} icon={faCalendar} />
    //       <Link href="/calendar">
    //         <span className={styles.linkText}>Calendar</span>
    //       </Link>
    //     </div>
    //     <div className={styles.linkContainer}>
    //       <FontAwesomeIcon className={styles.linkIcon} icon={faHome} />
    //       <Link href="/home">
    //         <span className={styles.linkText}>Home</span>
    //       </Link>
    //     </div>
    //     <Dropdown
    //       label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
    //       arrowIcon={false}
    //       inline={true}
    //     >
    //       <Dropdown.Item onClick={toggleLfModal} >
    //           Import
    //       </Dropdown.Item>
    //       <LastFmModal show={lfModal} dismissible={true}  onClose={toggleLfModal}/>
    //       <Dropdown.Item>
    //         Settings
    //       </Dropdown.Item>
    //       <Dropdown.Divider />
    //       <Dropdown.Item>
    //         Sign out
    //       </Dropdown.Item>
    //     </Dropdown>
    //   </div>
    // </header>
  );
}

export default UserHeader;
