import styles from "../styles/Search.module.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Link from "next/link";
import { Button } from "flowbite-react";
import { RxCheck } from "react-icons/rx";
import { useRouter } from "next/router";

function Search() {
  const { name } = useParams();
  const [myArtistsList, setMyArtistsList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (router.query.name) {
        fetch(`http://ar-back-git-main-pvnkrockjesvs.vercel.app/artists/search/${router.query.name}`)
          .then((response) => response.json())
          .then((data) => {
            setSearchResult(data.artists);
          })
          .catch((error) => {
            console.error("Error fetching data 1:", error);
          });
      }
    }, 800);
  }, [router.query.name]);

  //Vérifier si l'artiste est follow ou pas :
  useEffect(() => {
    if (user.token) {
      fetch(`http://ar-back-git-main-pvnkrockjesvs.vercel.app/profiles/myartists/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            data.artists && setMyArtistsList(data.artists);
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
      fetch(`http://ar-back-git-main-pvnkrockjesvs.vercel.app/artists`, {
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
            console.log("Artist is now Followed !");
            setMyArtistsList([...myArtistsList, artistData]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });
    } else if (user.token && isFollowed) {
      fetch(`http://ar-back-git-main-pvnkrockjesvs.vercel.app/artists`, {
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
  let artistsResearchList;
  if (searchResult) {
    artistsResearchList = searchResult.map((data, i) => {
      const isFollowed = myArtistsList.some(
        (objet) => objet.mbid === data.mbid
      );
      return (
        <div className={styles.artistContainer} key={i}>
          <div>
            <Link href={`/artist/${data.mbid}`}>
              <span className="mx-3 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                {data.name}
              </span>
            </Link>
          </div>
          <div>
            <p>{data.disambiguation}</p>
          </div>
          <div class="mx-2">
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
                size="xs"
                onClick={() => handleFollow(data)}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
      );
    });
  }

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
