import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import { Dropdown, Navbar, Avatar, Button, Modal, Label,TextInput, Checkbox, Radio } from "flowbite-react";
import LastFmModal from "./LastFmModal";
import { AiOutlineHome, AiFillCalendar } from "react-icons/ai";
import { logout } from "../reducers/user";




function UserHeader() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const profile = useSelector((state) => state.profile.value);
  const user = useSelector((state) => state.user.value);
  const [avatar, setAvatar] = useState()
  const [lfModal, setLfModal] = useState(false)

  const dispatch = useDispatch()

  const toggleLfModal = () => setLfModal(!lfModal)

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
    }, 1000);
     // Ajouter une pause de 1 seconde (1000 millisecondes) avant cette requête
     const letters = user.username.charAt(0).toUpperCase() + user.username.charAt(1).toUpperCase()

  }, [value]);

    //Fonction après appuie sur la touche entrée dans input text
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && value) {
            router.push(`/search/${value}`);
            console.log("Recherche effectuée avec la valeur :", value);
        }
    };

  return (
    <Navbar
      className="bg-white border-gray-200  items-center w-full dark:bg-gray-900"
      fluid={true}
      rounded={true}
    >
      <div >
        <input type="text" onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
          value={value} 
          className="block p-2.5 ml-3 w-full z-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="🔎 Search artist" required/>
      </div>
      <div className={styles.title}>
        <Navbar.Brand href="/">
          Album Release
        </Navbar.Brand>
      </div>
      <Navbar.Collapse >
        <Navbar.Link href="/">
          <AiOutlineHome className="h-11 w-10" />
        </Navbar.Link>
        <Navbar.Link href="/calendar">
          <AiFillCalendar className="h-11 w-10" />
        </Navbar.Link>
        <Dropdown
          label={<Avatar alt="User settings" className="h-11 w-11 mr-3" 
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
          rounded={true}/>}
          arrowIcon={false}
          inline={true} >
          <Dropdown.Item onClick={toggleLfModal} >
            Import
          </Dropdown.Item>
          <LastFmModal show={lfModal} dismissible={true}  onClose={toggleLfModal}/>
          <Dropdown.Item>
            Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => {dispatch(logout())}}>
            Sign out
          </Dropdown.Item>
        </Dropdown> 
      </Navbar.Collapse>
         
    </Navbar>
    // <header className={styles.header}>
    //   <div className={styles.searchContainer}>
    //     {/* <Autocomplete
    //       id="search-artist"
    //       sx={{ width: 400, backgroundColor: "rgb(55, 165, 35)" }}
    //       filterOptions={(x) => x}
    //       options={options}
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       renderInput={(params) => (
    //         <TextField
    //           className={styles.textInput}
    //           {...params}
    //           label="🔎 Search artist"
    //           variant="outlined"
    //         />
    //       )}
    //     /> */}
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
