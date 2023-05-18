import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Release.module.css";
import Image from "next/image";
import Moment from 'react-moment';

function Release() {
  const { mbid } = useParams();
  const [album, setAlbum ]= useState({});
  const [cover, setCover] = useState('/cover.jpeg');
  const [track, setTrack] = useState()
  const [trackLengthFormat, setTrackLengthFormat] = useState('mm:ss')

  useEffect(() => {
    fetch(`http://localhost:3000/releases/${mbid}`)
    .then((response) => response.json())
    .then((data) => {
      setAlbum(data);
      setTrack(data.tracks.map((track, i) => {
        if (track.trackLength > 3_600_000) {
          setTrackLengthFormat("hh:mm:ss")
        } else {
          setTrackLengthFormat("mm:ss")
        }
        return (
          <div className={styles.tracksInfos} key={i}>
            <div className={styles.trackTitle}>
              <p>
                {i+1} - {track.title}
              </p>
            </div>
            <div className={styles.minuteTracks}>
              <Moment format={trackLengthFormat}>{track.trackLength}</Moment>
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
            height={300} />
        <div className={styles.leftInfo}>
          <Moment format="DD MMMM YYYY">{album.date}</Moment>
          {album.label}
        </div>

      </div>

      {/* --RIGHT CONTAINER-- */}
      <div className={styles.rightContainer}>
        {/* --TEXT CONTAINER-- */}
        <div className={styles.textContainer}>
          <div className={styles.topText}>
            <h2 className={styles.releaseTitle}>{album.title}</h2>
            <button className={styles.buttonFollow}>Followed</button>
          </div>
          <div className={styles.releaseTitleInfos}>
            {album.trackCount} tracks <br/>
            {Math.floor(album.albumLength/60000)} minutes
          </div>
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
