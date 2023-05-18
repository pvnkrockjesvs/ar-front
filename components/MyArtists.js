import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import styles from '../styles/MyArtists.module.css'
import Link from 'next/link';

function MyArtists() {
   const user = useSelector((state) => state.user.value)

   const [title, setTitle] = useState('')
   const [artistList, setArtistList] = useState([])
   const username = user.username

   useEffect(() => {
      username.charAt(username.length-1) === 's' ? setTitle(username+"' releases") : setTitle(username+"'s releases")

      fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
      .then(response => response.json()).then((myartists) => {
         setArtistList(myartists.artists.map((data, i) => {
            const link = `/artist/${data.mbid}`
            return (<Link href={link} key={i} className={styles.artist}>{data.name}</Link>)
         }))
      })
   }, [])

   return (
      <div className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.artistsList}>
            {artistList}
         </div>
      </div>
   )
}
export default MyArtists