import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Release.module.css";
import Image from "next/image";
import Moment from "react-moment";
import LoaderMusic from "./LoaderMusic";
import { Spinner, Table, Button } from "flowbite-react";

function Release() {
  const { mbid } = useParams();
  const [album, setAlbum] = useState({});
  const [cover, setCover] = useState(null);
  const [track, setTrack] = useState();
  const [trackLengthFormat, setTrackLengthFormat] = useState("mm:ss");
  const [spotifyLink, setSpotifyLink] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/releases/${mbid}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
        //console.log(data);

        //Ajout du fetch pour récupérer le lien spotify
        fetch("http://localhost:3000/streaming/spotify/album", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ album: data.title, artist: data.artist }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              //code to add
              console.log(data.data[0].external_urls.spotify);
            }
          });

        setTrack(
          data.tracks.map((track, i) => {
            if (track.trackLength > 3_600_000) {
              setTrackLengthFormat("hh:mm:ss");
            } else {
              setTrackLengthFormat("mm:ss");
            }
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="text-sm whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {i + 1} - {track.title}
                </Table.Cell>
                <Table.Cell>
                  <Moment format={trackLengthFormat}>
                    {track.trackLength}
                  </Moment>
                </Table.Cell>
              </Table.Row>
              // <div className={styles.tracksInfos} key={i}>
              //   <div className={styles.trackTitle}>
              //     <p>
              //       {i+1} - {track.title}
              //     </p>
              //   </div>
              //   <div className={styles.minuteTracks}>
              //     <Moment format={trackLengthFormat}>{track.trackLength}</Moment>
              //   </div>
              // </div>
            );
          })
        );
      });

    fetch(`http://coverartarchive.org/release-group/${mbid}?fmt=json`)
      .then((response) => response.json())
      .then((cover) => {
        setCover(cover.images[0].image);
      });
  }, []);

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
              <figure class="relative max-w-sm transition-all duration-300 cursor-pointer">
                <img class="rounded-lg" src={cover} alt="image description" />

                <figcaption class="absolute px-4 text-md text-white bottom-6">
                  <p>{album.title}</p>
                  <Moment format="MMMM DD YYYY">{album.date}</Moment>
                </figcaption>
              </figure>
            )}
          </div>
          <h2 class="text-3xl pl-2 pt-4">{album && album.artist}</h2>
        </div>

        {/* --RIGHT CONTAINER-- */}
        <div className={styles.rightContainer}>
          {/* --TEXT CONTAINER-- */}
          <div className={styles.textContainer}>
            <div className={styles.topText}>
              <h2 className={styles.releaseTitle}>{album.title}</h2>
              <Button
                size="xs"
                className="text-white bg-gradient-to-r from-blue-500 
            via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 
            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Followed
              </Button>
            </div>
            <div className={styles.releaseTitleInfos}>
              {album.trackCount} tracks <br />
              {Math.floor(album.albumLength / 60000)} minutes
            </div>
          </div>
          {/* --DISCOGRAPHY CONTAINER-- */}
          <div className={styles.discographyContainer}>
            {/* <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>Tracks:</p>
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
