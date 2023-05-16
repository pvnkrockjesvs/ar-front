import styles from "../styles/Artist.module.css";
import Image from "next/image";

function Artist() {
  return (
    <div className={styles.mainContainer}>
      {/* --LEFT CONTAINER-- */}
      <div className={styles.leftContainer}>
        <h2 className={styles.artistNameLeft}>Artist EMINEM</h2>
        <div className={styles.artistPic}>
          <Image
            src="/artist.jpg"
            alt="Artist picture"
            width={300}
            height={300}
          />
        </div>
        <p className={styles.releaseTxt}>Last Release : </p>
        <div>
          <Image
            src="/Watch-the-throne.jpg"
            alt="Album cover"
            width={180}
            height={180}
          />
        </div>
        <div>
          <p>
            <a href="albumLink">Album Title</a>
          </p>
          <p>2023</p>
        </div>
      </div>

      {/* --RIGHT CONTAINER-- */}
      <div className={styles.rightContainer}>
        {/* --TEXT CONTAINER-- */}
        <div className={styles.textContainer}>
          <div className={styles.topText}>
            <h2 className={styles.artistName}>ARTIST EMINEM</h2>
            <button className={styles.buttonFollow}>Followed</button>
          </div>

          <p className={styles.artistDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* --DISCOGRAPHY CONTAINER-- */}
        <div className={styles.discographyContainer}>
          <div className={styles.discoFilter}>
            <p className={styles.discoTxt}>Discography : </p>
            <p>⚙️ Filter types</p>
          </div>
          <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>Albums</p>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
          </div>
          <div className={styles.albumsContainer}>
            <p className={styles.albumTxt}>EPs</p>
            <div className={styles.albumsList}>
              <div className={styles.albumTitle}>
                <p>
                  <a href="albumLink">Album Title</a> • 2023
                </p>
              </div>
              <div className={styles.minuteTracks}>
                <p>45 min</p>
                <p>15 tracks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
