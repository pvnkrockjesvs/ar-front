import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Release.module.css";
import Image from "next/image";

function Release() {
  const { mbid } = useParams();
  const [album, setAlbum ]= useState({});
  const [cover, setCover] = useState('/cover.jpeg');
  const [track, setTrack] = useState()

  useEffect(() => {
    fetch(`http://localhost:3000/releases/${mbid}`)
    .then((response) => response.json())
    .then((data) => {
      
      setAlbum(data);
      setTrack(data.tracks.map((track, i) => {
        return (
          <div className={styles.albumsInfos} key={i}>
            <div className={styles.albumTitle}>
              <p>
                {i+1} - {track.title}
              </p>
            </div>
            <div className={styles.minuteTracks}>
              <p>{track.length}</p>
            </div>
          </div>
        )
      }))
    });   

    fetch(`http://coverartarchive.org/release-group/${mbid}?fmt=json`)
    .then(response => response.json()).then((cover) => {
      setCover(cover.images[0].image)
    })
  }, [])

  
  
  return (
  <div>
    <div className={styles.mainContainer}>
    {/* --LEFT CONTAINER-- */}
      <div className={styles.leftContainer}>
        <Image
            src={cover}
            alt="Artist picture"
            width={300}
            height={300}
          />
        <p>{album.date}</p>
        <p>{album.label}</p>
      </div>

      {/* --RIGHT CONTAINER-- */}
      <div className={styles.rightContainer}>
        {/* --TEXT CONTAINER-- */}
        <div className={styles.textContainer}>
          <div className={styles.topText}>
            <h2 className={styles.artistName}>{album.title}</h2>
            <button className={styles.buttonFollow}>Followed</button>
          </div>
          <p className={styles.artistDescription}>
            {album.trackCount} tracks - {album.length}
          </p>
        </div>
        {/* --DISCOGRAPHY CONTAINER-- */}
        <div className={styles.discographyContainer}>
          <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>Tracks:</p>
            <div className={styles.trackContainer}>
              {track}           
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Release;
