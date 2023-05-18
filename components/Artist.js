import React, { useState, useEffect } from "react";
import styles from "../styles/Artist.module.css";
import { Popover, Button, Radio } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import allreleases, {
  addAlbums,
  addEps,
  removeAllAlbums,
} from "../reducers/allreleases";
import moment from "moment";

function Artist() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [filterEps, setFilterEps] = useState(false);
  const [filterAlbums, setFilterAlbums] = useState(false);
  const [open, setOpen] = useState(false);
  const [artistInformation, setArtistInformation] = useState(null);
  const [lastAlbum, setLastAlbum] = useState(null);
  const [epsList, setEpsList] = useState([]);
  const [albumsList, setAlbumsList] = useState([]);
  const dispatch = useDispatch();
  const allreleases = useSelector((state) => state.allreleases.value);
  const user = { token: false };

  //Fonction de conversion du temps total d'un album avec momentjs
  const calculTotalDuration = (totalTime) => {
    const duration = moment.duration(totalTime);

    let formattedTime;
    if (duration.asMinutes() >= 60) {
      formattedTime = duration.hours() + "h" + duration.minutes() + "min";
    } else {
      formattedTime = duration.minutes() + "min";
    }
    return formattedTime;
  };

  useEffect(() => {
    dispatch(removeAllAlbums());
    //Fetch pour infos artist & albums
    setTimeout(() => {
      fetch(
        `http://localhost:3000/artists/f59c5520-5f46-4d2c-b2c4-822eabf53419`
      )
        .then((response) => response.json())
        .then((data) => {
          data && setArtistInformation(data.art);
        });
    }, 2000);

    //Fetch pour récupérer le last albums
    // setTimeout(() => {
    //   fetch(
    //     `http://localhost:3000/artists/f59c5520-5f46-4d2c-b2c4-822eabf53419/lastalbum`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       data && setLastAlbum(data.releases);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data 1:", error);
    //     });
    // }, 2000);

    //Fetch pour récupérer les infos d'albums
    setTimeout(() => {
      fetch(
        `http://localhost:3000/artists/f59c5520-5f46-4d2c-b2c4-822eabf53419/album`
      )
        .then((response) => response.json())
        .then((data) => {
          data && dispatch(addAlbums(data.releases));
          setAlbumsList(data.releases);
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    }, 4500); // Ajouter une pause de 1 seconde (1000 millisecondes) avant cette requête

    //Fetch pour récupérer les infos d'eps
    setTimeout(() => {
      fetch(
        `http://localhost:3000/artists/f59c5520-5f46-4d2c-b2c4-822eabf53419/ep`
      )
        .then((response) => response.json())
        .then((data) => {
          data && dispatch(addEps(data.releases));
          setEpsList(data.releases);
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    }, 7000); // Ajouter une pause de 2 secondes (2000 millisecondes) avant cette requête

    //Vérifier les releaseTypes d'albums depuis les données profiles de la db + filtrage des albums
    //info à stocker plutot dans le persist store Redux?
    // if (user.token) {
    //   setTimeout(() => {
    //     fetch(`http://localhost:3000/profiles/${user.token}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data.result) {
    //           //Modifier selon les valeurs releaseTypes de profiles (à tester)
    //           setSelectedOption("albums");
    //           filterAlbums(albums);
    //         }
    //       });
    //   }, 6500); // Ajouter une pause de 3 secondes (3000 millisecondes) avant cette requête
    // }
  }, []);

  //console log
  if (lastAlbum) {
    console.log(lastAlbum);
  }
  //   console.log(allreleases.eps);
  //   console.log(filterEps);
  // }

  //Filtrage du tableau d'Albums/EPs à afficher
  const setFilter = () => {
    if (selectedOption === "albums") {
      setFilterAlbums(true);
      setFilterEps(false);
    } else if (selectedOption === "eps") {
      setFilterAlbums(false);
      setFilterEps(true);
    } else {
      setFilterAlbums(true);
      setFilterEps(true);
    }
  };

  //Filtrage des Albums en fonction des Radioboxes :
  useEffect(() => {
    if (allreleases) {
      setFilter();
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
  const albumsToShow = albumsList.map((data, i) => {
    const albumLength = calculTotalDuration(data.length);

    return (
      <div className={styles.albumsInfos} key={i}>
        <div className={styles.albumTitle}>
          <p>
            <a href="albumLink">{data.title}</a> • {data.date}
          </p>
        </div>
        <div className={styles.minuteTracks}>
          <p>{albumLength}</p>
          <p>{data.numberTracks} tracks</p>
        </div>
      </div>
    );
  });

  //.map du tableau d'eps filtrés pour l'afficher
  const epsToShow = epsList.map((data, i) => {
    const albumLength = calculTotalDuration(data.length);

    return (
      <div className={styles.albumsInfos} key={i}>
        <div className={styles.albumTitle}>
          <p>
            <a href="albumLink">{data.title}</a> • {data.date}
          </p>
        </div>
        <div className={styles.minuteTracks}>
          <p>{albumLength}</p>
          <p>{data.numberTracks} tracks</p>
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
        <h2 className={styles.artistNameLeft}>
          {artistInformation && artistInformation.name}
        </h2>
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
            <h2 className={styles.artistName}>
              {artistInformation && artistInformation.name}
            </h2>
            <button className={styles.buttonFollow}>Followed</button>
          </div>

          <p className={styles.artistDescription}>
            {artistInformation && artistInformation.bio}
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
          {/* LOADER */}
          {albumsList.length === 0 && (
            <div className={styles.loader}>
              <span className={styles.loaderText}>loading</span>
              <span className={styles.load}></span>
            </div>
          )}
          {filterAlbums && (
            <div className={styles.albumsContainer}>
              <p className={styles.albumTxt}>Albums</p>
              {albumsToShow}
            </div>
          )}
          {epsList.length === 0 && (
            <div className={styles.loader}>
              <span className={styles.loaderText}>loading</span>
              <span className={styles.load}></span>
            </div>
          )}
          {filterEps && (
            <div className={styles.albumsContainer}>
              <p className={styles.albumTxt}>EPs</p>
              {epsToShow}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;
