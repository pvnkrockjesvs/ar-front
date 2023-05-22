import styles from "../styles/Search.module.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Link from "next/link";
import { Button } from "flowbite-react";
import { RxCheck } from "react-icons/rx";

function Search() {
  const { name } = useParams();
  const [myArtistsList, setMyArtistsList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    setTimeout(() => {
      if (name) {
        fetch(`http://localhost:3000/artists/search/${name}`)
          .then((response) => response.json())
          .then((data) => {
            setSearchResult(data.artists);
          })
          .catch((error) => {
            console.error("Error fetching data 1:", error);
          });
      }
    }, 300);
  }, []);

  //Vérifier si l'artiste est follow ou pas :
  useEffect(() => {
    if (user.token) {
      fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setMyArtistsList(data.artists);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    }
  }, [handleFollow]);

  //Fonction Follow Artist
  const handleFollow = (data) => {
    const artistData = { name: data.name, mbid: data.mbid };
    const isFollowed = myArtistsList.some((objet) => objet.mbid === data.mbid);
    if (user.token && !isFollowed) {
      console.log("Token is OK");
      fetch(`http://localhost:3000/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbid: data.mbid,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(artistData);
            console.log("Artist is now Followed !");
            setMyArtistsList([...myArtistsList, artistData]);
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
          mbid: data.mbid,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("Artist is now Unfollowed");
            const newArray = myArtistsList.filter(
              (objet) => objet.mbid !== artistData.mbid
            );
            setMyArtistsList(newArray);
          }
        });
    }
  };

  //console log
  //console.log(myArtistsList);

  //map de la liste de résultat de recherche
  const artistsResearchList = searchResult.map((data, i) => {
    const isFollowed = myArtistsList.some((objet) => objet.mbid === data.mbid);
    return (
      <div className={styles.artistContainer} key={i}>
        <div>
          <Link href={`/artist/${data.mbid}`}>
            <span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
              {data.name}
            </span>
          </Link>
          • {data.date}
        </div>
        <div>
          <p>{data.disambiguation}</p>
        </div>
        <div>
          {isFollowed ? (
            <Button
              gradientDuoTone="purpleToBlue"
              size="xs"
              onClick={() => handleFollow(data)}
            >
              <RxCheck /> Followed
            </Button>
          ) : (
            <Button
              gradientDuoTone="purpleToBlue"
              onClick={() => handleFollow(data)}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <h2 className={styles.title}>Your Search</h2>

        {artistsResearchList}
      </div>
    </div>
  );
}

export default Search;
