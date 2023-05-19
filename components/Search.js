import styles from "../styles/Search.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Search() {
  const { name } = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.value);
  const profile = useSelector((state) => state.profile.value);

  useEffect(() => {
    setTimeout(() => {
      if (name) {
        fetch(`http://localhost:3000/artists/search/${name}`)
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
          <a href={`/artist/${data.mbid}`}>{data.name}</a>
        </div>
        <div>
          <p>{data.disambiguation}</p>
        </div>
        <div>
          <button
            className={styles.buttonFollow}
            onClick={() => handleFollow(mbid)}
          >
            {isFollowed ? "✅Followed" : "Follow"}
          </button>
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
