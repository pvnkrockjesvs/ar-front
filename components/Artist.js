import styles from "../styles/Artist.module.css";
import Image from "next/image";

function Artist() {
  return (
    <div className={styles.mainContainer}>
      {/* --LEFT CONTAINER-- */}
      <div className={styles.leftContainer}>
        <Image
          className={styles.artistPic}
          src="/artist.jpg"
          alt="Artist picture"
          width={300}
          height={300}
        />
        <p>Last Release : </p>
        <Image
          className={styles.albumCover}
          src="/Watch-the-throne.jpg"
          alt="Album cover"
          width={300}
          height={300}
        />
        <div>
          <p>Album Title</p>
          <p>2023</p>
        </div>
      </div>

      {/* --RIGHT CONTAINER-- */}
      <div className={styles.rightContainer}>
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
        <div className={styles.discographyContainer}></div>
      </div>
    </div>
  );
}

export default Artist;
