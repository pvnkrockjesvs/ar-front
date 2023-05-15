import styles from "../styles/Artist.module.css";
import Image from "next/image";

function Artist() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Image
          src="/artist.jpg"
          alt="Artist picture"
          width={120}
          height={120}
        />
        <p>Last Release : </p>
        <Image
          src="/Watch-the-throne.jpg"
          alt="Album cover"
          width={120}
          height={120}
        />
        <p>Album Title</p>
        <p>2023</p>
      </div>
      <div className={styles.textContainer}></div>
      <div className={styles.discographyContainer}></div>
    </div>
  );
}

export default Artist;
