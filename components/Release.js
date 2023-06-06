import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Release.module.css";
import Image from "next/image";
import Moment from "react-moment";
import LoaderMusic from "./LoaderMusic";
import { Spinner, Table, Button, Card } from "flowbite-react";
import { useRouter } from "next/router";

function Release() {
  const { mbid } = useParams();
  const [album, setAlbum] = useState({});
  const [cover, setCover] = useState(null);
  const [track, setTrack] = useState();
  const [trackLengthFormat, setTrackLengthFormat] = useState("mm:ss");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [deezerLink, setDeezerLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.mbid) {
      fetch(`https://ar-back-git-main-pvnkrockjesvs.vercel.app/releases/${router.query.mbid}`)
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data);

          //Ajout du fetch pour récupérer le lien spotify
          if (data.title && data.artist) {
            fetch("https://ar-back-git-main-pvnkrockjesvs.vercel.app/streaming/spotify/album", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ album: data.title, artist: data.artist }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  data.data[0] &&
                    setSpotifyLink(data.data[0].external_urls.spotify);
                }
              });

            //Ajout du fetch pour récupérer le lien deezer
            fetch(`https://ar-back-git-main-pvnkrockjesvs.vercel.app/streaming/deezer/album`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ album: data.title, artist: data.artist }),
            })
              .then((response) => response.json())
              .then((data) => {
                const urlTrackList = data.data.tracklist;
                const modifiedUrl = urlTrackList.replace("api.", "");
                setDeezerLink(modifiedUrl);
              })
              .catch((error) => {
                console.error(
                  "Une erreur s'est produite lors de la recherche Deezer:",
                  error
                );
              });
          }

          setTrack(
            data.tracks.map((track, i) => {
              if (track.trackLength > 3_600_000) {
                setTrackLengthFormat("hh:mm:ss");
              } else {
                setTrackLengthFormat("mm:ss");
              }
              return (
                <Table.Row
                  key={i}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="text-sm whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1} - {track.title}
                  </Table.Cell>
                  <Table.Cell>
                    <Moment format={trackLengthFormat}>
                      {track.trackLength}
                    </Moment>
                  </Table.Cell>
                </Table.Row>
              );
            })
          );
        });

      fetch(
        `http://coverartarchive.org/release-group/${router.query.mbid}?fmt=json`
      )
        .then((response) => response.json())
        .then((cover) => {
          setCover(cover.images[0].thumbnails.large);
        });
    }
  }, [router.query.mbid]);

  function Spotify() {
    if (spotifyLink) {
      return (
        <div class="pt-4 mx-3">
          <a class="flex flex-row" href={spotifyLink} target="_blank">
            <img class="h-6 mr-1" src="/spotify_logo.png" />
            <p>Listen on Spotify</p>
          </a>
        </div>
      );
    }
  }

  function Deezer() {
    if (deezerLink) {
      return (
        <div class="pt-4 mx-3">
          <a class="flex flex-row" href={deezerLink} target="_blank">
            <img class="h-6 mr-1" src="/deezer_logo.png" />
            <p>Listen on Deezer</p>
          </a>
        </div>
      );
    }
  }

  return (
    <div>
      <div className={styles.mainContainer}>
        {/* --LEFT CONTAINER-- */}
        <div className={styles.leftContainer}>
          <div className={styles.albumPic}>
            {!cover ? (
              <div className="text-center">
                <Spinner aria-label="Center-aligned spinner example" />
              </div>
            ) : (
              <div>
                <img
                  class="h-auto rounded-lg"
                  src={cover}
                  alt="image description"
                ></img>
                <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                  {album.title}
                </p>
                <p className="font-normal italic text-base text-gray-700 dark:text-gray-400">
                  <Moment format="MMMM DD YYYY">{album.date}</Moment> -{" "}
                  {album.label}
                </p>
                {/* <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                  {album.genre[0].name}
                </p> */}
              </div>
            )}
          </div>
          {/* <span>
            <h2
              onClick={() => router.push(`/artist/${album.arid}`)}
              class=" cursor-pointer text-3xl pl-2 pt-4 hover:text-indigo-600"
            ></h2>
          </span>
            >
              {album && album.artist}
            </h2>
          </span> */}
        </div>

        {/* --RIGHT CONTAINER-- */}
        <div className={styles.rightContainer}>
          {/* --TEXT CONTAINER-- */}
          <div className={styles.textContainer}>
            <div className={styles.topText}>
              <h2 className={styles.releaseTitle}>{album.title}</h2>
              {/* <Button
                size="xs"
                className="text-white bg-gradient-to-r from-blue-500 
            via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Followed
              </Button> */}
            </div>
            <p
              onClick={() => router.push(`/artist/${album.arid}`)}
              className="cursor-pointer items-center text-xl text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
            >
              {album.artist}
            </p>
            <div className={styles.releaseTitleInfos}>
              {album.trackCount} tracks <br />
              {Math.floor(album.albumLength / 60000)} minutes
            </div>
            <div class="flex flex-row m-4">
              <Spotify />
              <Deezer />
            </div>
          </div>
          {/* --DISCOGRAPHY CONTAINER-- */}
          <div className={styles.discographyContainer}>
            <p className=" text-2xl font-medium text-gray-700 dark:text-gray-400 pb-5">
              Album tracks:
            </p>

            {/* <div className={styles.albumsContainer}>
            <div className={styles.trackContainer}>
              {track}           
            </div>
          </div> */}
            <Table className="w-full">
              <Table.Head>
                <Table.Body className="divide-y w-full">{track}</Table.Body>
              </Table.Head>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Release;
