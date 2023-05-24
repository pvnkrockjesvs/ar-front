import styles from "../styles/Header.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar, Button } from "flowbite-react";
import SearchInput from "./SearchInput";

function ConnectionHeader(props) {
  const router = useRouter();

  const handleClick = (buttonType) => {
    props.selectSignOption(buttonType);
  };

  return (
    <Navbar
      className="bg-white border-gray-200  items-center w-full dark:bg-gray-900"
      fluid={true}
      rounded={true}
    >
      <SearchInput />

      <div className={styles.title}>
        <Navbar.Brand href="/">Album Release</Navbar.Brand>
      </div>
      <Navbar.Collapse>
        <Navbar.Link onClick={(e) => handleClick("signup")}>
          <Button gradientMonochrome="teal" pill={true}>
            Create an account
          </Button>
        </Navbar.Link>
        <Navbar.Link onClick={(e) => handleClick("signin")}>
          <Button gradientMonochrome="teal" pill={true}>
            Connect
          </Button>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ConnectionHeader;
