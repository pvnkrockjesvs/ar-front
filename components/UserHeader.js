import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function UserHeader() {
  const [searchInput, setSearchInput] = useState("");
  const [artistsSuggestion, setArtistsSuggestion] = useState([]);

  //Recherche d'un artiste par son nom
  const handleSubmit = () => {
    if (searchInput.length > 3) {
      setTimeout(() => {
        fetch(`http://localhost:3000/artists/${idArtistTest}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      }, 1000); // Ajouter une pause de 1 seconde (1000 ms) avant cette requête
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <input
          className={styles.messageContainer}
          type="text"
          placeholder="Search artist"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className={styles.title}>
        <span>Album Release</span>
      </div>
      <div className={styles.navMenu}>
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
            <span className={styles.linkText}>Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
