import styles from "../styles/Search.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Link from 'next/link';
import { Button } from "flowbite-react";
import { RxCheck } from "react-icons/rx";
import {useRouter} from "next/router";

function Search() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);
  const profile = useSelector((state) => state.profile.value);
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (router.query.name) {
        fetch(`http://localhost:3000/artists/search/${router.query.name}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.artists);
            setSearchResult(data.artists);
          })
          .catch((error) => {
            console.error("Error fetching data 1:", error);
          });
      }
    }, 1000);

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
    } else {
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

  //map de la liste de résultat de recherche
  const artistsResearchList = searchResult.map((data, i) => {
    return (
      <div className={styles.artistContainer} key={i}>
        <div>
          <Link  href={`/artist/${data.mbid}`}><span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">{data.name}</span></Link> • {data.date}
        </div>
        <div>
          <p>{data.disambiguation}</p>
        </div>
        <div>
        {isFollowed ? (
        <Button gradientDuoTone="purpleToBlue" size="xs"
            onClick={() => handleFollow(mbid)}
          ><RxCheck /> Followed</Button>) 
          : <Button gradientDuoTone="purpleToBlue"
          onClick={() => handleFollow(mbid)}
        >Follow</Button>}
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
