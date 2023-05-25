import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import moment from "moment";
import { Card } from "flowbite-react";
import LoaderMusic from "./LoaderMusic";
import { useRouter } from "next/router";

function Home() {
  const [popularAlbums, setPopularAlbums] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/topreleases`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.releases);
        setPopularAlbums(data.releases);
      })
      .catch((error) => {
        console.error("Error fetching data 1:", error);
      });
  }, []);

  //Map du tableau d'albums populaires :
  popularAlbums.sort((a, b) => new Date(b.date) - new Date(a.date));
  const albumsToShow = popularAlbums.map((data, i) => {
    const date = moment(data.date);
    const dateAlbum = date.format("DD-MM-YYYY");
    return (
      <div className="max-w-xs p-2.5" key={i}>
        <Card
          className="cursor-pointer"
          onClick={() => router.push(`../release/${data.mbid}`)}
          imgSrc={data.cover}
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.artist}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {data.title}
          </p>
          <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
            {dateAlbum}
          </p>
        </Card>
      </div>
    );
  });

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Popular New Releases</h1>
      <div className={styles.albumsContainer}>{albumsToShow}</div>
    </div>
  );
}

export default Home;
