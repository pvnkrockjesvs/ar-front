import { Dropdown, Avatar, Button, Modal, Label,TextInput, Checkbox, Radio } from "flowbite-react";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { storeProfile } from "../reducers/profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ConflictSearchModal = (props) => {
  const [searchResult,setSearchResult] = useState([])
  const user = useSelector((state) => state.user.value);
  const [myArtistsList, setMyArtistsList] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter()

  const profile = useSelector((state) => state.profile.value);


  const handleFollow = (data) => {
    const artistData = { name: data.name, mbid: data.mbid };
    const isFollowed = myArtistsList.some((objet) => objet.mbid === data.mbid);
    if (user.token && !isFollowed) {
      console.log("Token is OK");
      fetch(`http://localhost:3000/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbid: data.mbid,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log(artistData);
            console.log("Artist is now Followed !");
            setMyArtistsList([...myArtistsList, artistData]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data 1:", error);
        });

        handleDelete({props: props});

    } else if (user.token && isFollowed) {
      fetch(`http://localhost:3000/artists`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbid: data.mbid,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            console.log("Artist is now Unfollowed");
            const newArray = myArtistsList.filter(
              (objet) => objet.mbid !== artistData.mbid
            );
            setMyArtistsList(newArray);
          }
        });
    }
};

  const handleDelete = (data) => {
    console.log(data)
    fetch(`http://localhost:3000/profiles/conflict`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conflict: data.props.artistName,
        token: user.token,
      })
    }).then((response) => response.json()).then((res) => {

      fetch(`http://localhost:3000/profiles/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: user.token }),
      })
      .then((response) => response.json())
      .then((res) => {
          if (!res.result) {
            // console.log("No profile Found");
          } else {
            dispatch(storeProfile(res.profile));
          }
      });
    })

    data.button ? props.onClose() : console.log('')
  }

  // useEffect(() => {
  //   if (user.token) {
  //     fetch(`http://localhost:3000/profiles/myartists/${user.token}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.result) {
  //           setMyArtistsList(data.artists);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data 1:", error);
  //       });
  //   }
  // }, [handleFollow]);

  // useEffect(() => { 
  //   if (props.myArtists.length > 0) {
  //     setMyArtistsList(props.myArtists)
  //   }  
  // }, [props.artistName])

  useEffect(() => {
    if (props.myArtists.length > 0) {
      setMyArtistsList(props.myArtists)
    }   
    if (props.artistName !== '' && props.artistName !== undefined) {
 

      // console.log(myArtistsList)
      fetch(`http://localhost:3000/artists/search/${props.artistName}`)
      .then((response) => response.json()).then((data) => {
        console.log(props.artistNames)

        data.artists = data.artists.slice(0, 10)
        // console.log(data)
        setSearchResult(data.artists.map((searchList, i) => {
          const isFollowed = myArtistsList.some((objet) => objet.mbid === data.mbid);
          return(
            <div key={i} className="flex flex-row items-center justify-between py-1">
              <div>
                <span onClick={() => router.push(`/artist/${searchList.mbid}`)}className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                  {searchList.name}
                </span>
              </div>
              <div className="text-xs ">
                <p>{searchList.disambiguation}</p>
              </div>
              <div>
                {isFollowed ? (
                  <Button
                    gradientDuoTone="purpleToBlue"
                    size="xs"
                    onClick={() => handleFollow(searchList)}
                    >
                    <RxCheck /> Followed
                  </Button>
                ) : (
                  <Button
                    gradientDuoTone="purpleToBlue"
                    size="xs"
                    onClick={() => handleFollow(searchList)}
                    >
                    Follow
                  </Button>
                )}
              </div>
            </div>
          )
        }))
      })
    }
  }, [props.artistName])
  
  return (
    <Modal show={props.show} onClose={props.onClose} dismissible={true}>
      <Modal.Header>
        Conflict: {props.artistName}
      </Modal.Header>
      <Modal.Body>
        {searchResult}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>
          Close
        </Button >
        <Button onClick={() => handleDelete({props, button : 'delete'})}>
          Delete artist
        </Button >
      </Modal.Footer>
    </Modal>
  )
}

export default ConflictSearchModal