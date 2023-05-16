import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Artist.module.css";
import { Popover, Button, Radio } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addAlbums } from "../reducers/albums";

function Artist() {
  const [selectedOption, setSelectedOption] = useState("");
  const [open, setOpen] = useState(false);
  const [albumsFiltered, setAlbumsFiltered] = useState([]);
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.value);
  const user = { token: false };

  useEffect(() => {
    //Fetch pour infos artist & albums
    // fetch(`http://musicbrainz-fetch`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch(addAlbums(data.albums));
    //   });

    //Vérifier les releaseTypes d'albums depuis les données profiles de la db + filtrage des albums
    if (user.token) {
      fetch(`http://localhost:3000/profiles/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //Modifier selon les valeurs releaseTypes (à tester)
            setSelectedOption("albums");
            filterAlbums(albums);
          }
        });
    }
  }, []);

  //Filtrage du tableau d'Albums/EPs à afficher
  const filterAlbums = (albumsData) => {
    if (selectedOption === "all") {
      setAlbumsFiltered(albumsData);
    } else if (selectedOption === "albums") {
      const albumsOnly = albumsData.filter((album) => album.type === "album");
      setAlbumsFiltered(albumsOnly);
    } else if (selectedOption === "eps") {
      const epsOnly = albumsData.filter((album) => album.type === "ep");
      setAlbumsFiltered(epsOnly);
    }
  };

  //Filtrage des Albums en fonction des Radioboxes :
  useEffect(() => {
    if (albums.length > 0) {
      filterAlbums(albums);
    }
  }, [selectedOption]);

  //Fonction sur les onChange des Radioboxes (modifie la valeur true ou false de selectedOption):
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //Checkboxes :
  const popoverContent = (
    <div className={styles.popoverContent}>
      <Radio
        type="radio"
        value="all"
        checked={selectedOption === "all"}
        onChange={handleOptionChange}
      >
        All Albums & EPs
      </Radio>
      <Radio
        type="radio"
        value="albums"
        checked={selectedOption === "albums"}
        onChange={handleOptionChange}
      >
        Albums
      </Radio>
      <Radio
        type="radio"
        value="eps"
        checked={selectedOption === "eps"}
        onChange={handleOptionChange}
      >
        EPs
      </Radio>
    </div>
  );

  //.map du tableau d'albums filtrés pour l'afficher
  const albumsToShow = albumsFiltered.map((data, i) => {
    return (
      <div className={styles.albumsInfos}>
        <div className={styles.albumTitle}>
          <p>
            <a href="albumLink">{data.album.title}</a> • {data.album.year}
          </p>
        </div>
        <div className={styles.minuteTracks}>
          <p>{data.album.duration}min</p>
          <p>{data.albums.numberOfTracks} tracks</p>
        </div>
      </div>
    );
  });

  //Fonction pour changer open à true ou false sur le popover
  const handleOpenChange = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* --LEFT CONTAINER-- */}
      <div className={styles.leftContainer}>
        <h2 className={styles.artistNameLeft}>Artist EMINEM</h2>
        <div className={styles.artistPic}>
          <Image
            src="/artist.jpg"
            alt="Artist picture"
            width={300}
            height={300}
          />
        </div>
        <p className={styles.releaseTxt}>Last Release : </p>
        <div>
          <Image
            src="/Watch-the-throne.jpg"
            alt="Album cover"
            width={180}
            height={180}
          />
        </div>
        <div>
          <p>
            <a href="albumLink">Album Title</a>
          </p>
          <p>2023</p>
        </div>
      </div>

      {/* --RIGHT CONTAINER-- */}
      <div className={styles.rightContainer}>
        {/* --TEXT CONTAINER-- */}
        <div className={styles.textContainer}>
          <div className={styles.topText}>
            <h2 className={styles.artistName}>ARTIST EMINEM</h2>
            <button className={styles.buttonFollow}>Followed</button>
          </div>

          <p className={styles.artistDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* --DISCOGRAPHY CONTAINER-- */}
        <div
          className={styles.discographyContainer}
          onScroll={() => setOpen(false)}
        >
          <div className={styles.discoFilter}>
            <p className={styles.discoTxt}>Discography : </p>
            <Popover
              title="Filter types"
              content={popoverContent}
              className={styles.popover}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button
                style={{
                  backgroundColor: "#0953db",
                  color: "white",
                  fontFamily: "Montserrat",
                }}
              >
                ⚙️ Filter types
              </Button>
            </Popover>
          </div>
          <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>Albums</p>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
          </div>
          <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>EPs</p>
            <div className={styles.albumsInfos}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
