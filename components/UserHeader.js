import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
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

  const handleLogOut = () => {

    dispatch(logout());
    dispatch(deleteProfile());
    router.push("/")

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
        <Navbar.Link onClick={() => router.push("/")} className="cursor-pointer">
          <AiOutlineHome className="h-11 w-10" />
        </Navbar.Link>
        <Navbar.Link href={"/calendar"}>
          <AiFillCalendar className="h-11 w-10" />
        </Navbar.Link>
        <Dropdown
          label={
            <Avatar
              alt="User settings"
              className="h-11 w-11 mr-3"
              img={profile.avatar}
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
  );
}

export default UserHeader;
