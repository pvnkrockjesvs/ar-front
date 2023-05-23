import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoaderMusic from "./LoaderMusic";
import styles from "../styles/Artist.module.css";
import { Popover, Radio } from "antd";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import allreleases, {
  addAlbums,
  addEps,
  removeAllAlbums,
} from "../reducers/allreleases";
import moment from "moment";
import Link from "next/link";
import { Button } from "flowbite-react";
import { RxGear, RxCheck } from "react-icons/rx";

function Artist() {
  const [selectedOption, setSelectedOption] = useState("all");
  const [isFollowed, setIsFollowed] = useState(false);
  const [filterEps, setFilterEps] = useState(false);
  const [filterAlbums, setFilterAlbums] = useState(false);
  const [open, setOpen] = useState(false);
  const [artistInformation, setArtistInformation] = useState(null);
  const [lastAlbum, setLastAlbum] = useState(null);
  const [cover, setCover] = useState(null);
  const [epsList, setEpsList] = useState([]);
  const [albumsList, setAlbumsList] = useState([]);
  const dispatch = useDispatch();
  const allreleases = useSelector((state) => state.allreleases.value);
  const user = useSelector((state) => state.user.value);
  const profile = useSelector((state) => state.profile.value);
  const [lastUrl, setLastUrl] = useState("");
  const { mbid } = useParams();

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
      fetch(`http://localhost:3000/artists/${mbid}`)
        .then((response) => response.json())
        .then((data) => {
          data && setArtistInformation(data.art);
        });
    }, 2000);

    //Fetch pour récupérer le last album
    setTimeout(() => {
      fetch(`http://localhost:3000/artists/${mbid}/lastalbum`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setLastAlbum(data);
            setLastUrl(`../release/${data.mbid}`);
            const albumMbid = data.mbid;

            //Fetch pour récupérer la cover last album
            console.log(albumMbid);
            fetch(
              `http://coverartarchive.org/release-group/${albumMbid}?fmt=json`
            )
              .then((response) => response.json())
              .then((cover) => {
                setCover(cover.images[0].image);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching for Last Album:", error);
        });
    }, 2000);

    //Fetch pour récupérer les infos d'albums
    setTimeout(() => {
      fetch(`http://localhost:3000/artists/${mbid}/album`)
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
      fetch(`http://localhost:3000/artists/${mbid}/ep`)
        .then((response) => response.json())
        .then((data) => {
          data && dispatch(addEps(data.releases));
          setEpsList(data.releases);
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    }, 7000); // Ajouter une pause de 2 secondes (2000 millisecondes) avant cette requête

    //Vérifier les releaseTypes d'albums depuis le store + filtrage des albums avec selectedOption
    if (profile[0]) {
      const typesArray = profile[0].releaseTypes;
      if (
        typesArray === 3 ||
        (typesArray.includes("ep") && typesArray.includes("album"))
      ) {
        setSelectedOption("all");
      } else if (typesArray.includes("album")) {
        setSelectedOption("albums");
      } else if (typesArray.includes("ep")) {
        setSelectedOption("eps");
      }
    }

    //Vérifier si l'artiste est follow ou pas :
    if (user.token) {
      fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            data.artists.some((mbidArtist) => mbidArtist.mbid === mbid) &&
              setIsFollowed(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    }
  }, []);

  //console log
  // if (cover) {
  //   console.log(cover);
  // }

  //Fonction Follow Artist
  const handleFollow = (idArtist) => {
    if (user.token && !isFollowed) {
      console.log("Token is OK");
      fetch(`http://localhost:3000/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbid: idArtist,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("data ok");
            setIsFollowed(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    } else if (user.token && isFollowed) {
      fetch(`http://localhost:3000/artists`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbid: idArtist,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("data ok");
            setIsFollowed(false);
          }
        });
    }
  };

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

  //Checkboxes du filtre par type :
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
    const url = `../release/${data.mbid}`;

    return (
      <div className={styles.albumsInfos} key={i}>
        <div className={styles.albumTitle}>
          <p>
            <Link href={url}>
              <span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                {data.title}
              </span>
            </Link>{" "}
            • {data.date}
          </p>
        </div>
        {/* <div className={styles.minuteTracks}>
          <p>{albumLength}</p>
          <p>{data.numberTracks} tracks</p>
        </div> */}
      </div>
    );
  });

  //.map du tableau d'eps filtrés pour l'afficher
  const epsToShow = epsList.map((data, i) => {
    const albumLength = calculTotalDuration(data.length);

    const url = `../release/${data.mbid}`;

    return (
      <div className={styles.albumsInfos} key={i}>
        <div className={styles.albumTitle}>
          <p>
            <Link href={url}>
              <span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                {data.title}
              </span>
            </Link>{" "}
            • {data.date}
          </p>
        </div>
        {/* <div className={styles.minuteTracks}>
          <p>{albumLength}</p>
          <p>{data.numberTracks} tracks</p>
        </div> */}
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
          {!artistInformation ? (
            <div className={styles.loaderDiv1}>
              <LoaderMusic />
            </div>
          ) : artistInformation.image ? (
            <img
              class="h-auto max-w-md rounded-lg"
              src={artistInformation.image}
              alt="image description"
            />
          ) : (
            <Image
              src={artistInformation.image}
              alt="Artist picture"
              width={300}
              height={300}
            />
          )}
        </div>
        <p className={styles.releaseTxt}>Last Release : </p>
        <div>
          {!lastAlbum ? (
            <div className={styles.loaderDiv2}>
              <LoaderMusic />
            </div>
          ) : (
            <figure class="relative max-w-xs transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
              <a href={lastUrl}>
                <img class="rounded-lg" src={cover} alt="image description" />
              </a>
              <figcaption class="absolute px-4 text-md text-white bottom-6">
                <p>{lastAlbum.title}</p>
                <p>{lastAlbum.date}</p>
              </figcaption>
            </figure>
          )}
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
            {isFollowed ? (
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={() => handleFollow(mbid)}
              >
                <RxCheck /> Followed
              </Button>
            ) : (
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={() => handleFollow(mbid)}
              >
                Follow
              </Button>
            )}
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
              <Button gradientMonochrome="teal" size="xs">
                <RxGear className="mr-2 h-5 w-5" />
                Filter types
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
