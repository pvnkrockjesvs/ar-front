import { Table, Button, Modal } from "flowbite-react";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const SearchConflicts = (props) => {
   const [searchResult, setSearchResult] = useState([])

  const user = useSelector((state) => state.user.value);


  useEffect(() => {
      fetch(`http://localhost:3000/artists/search/${props.name}`)
      .then((response) => response.json())
      .then((data) => {
         console.log(data.artists);
         setSearchResult(data.artists);
      })
      .catch((error) => {
         console.error("Error fetching data 1:", error);
      });
  }, [])

  const artists = searchResult.map((data, i ) => {
      return data.name
  })

   const disambiguations = searchResult.map((data, i ) => {
      return data.disambiguation
   })

   // const follows = searchResult.map((data, i ) => {
   //    {isFollowed ? (
   //       <Button gradientDuoTone="purpleToBlue" size="xs"
   //           onClick={() => handleFollow(data.mbid)}
   //         ><RxCheck /> Followed</Button>) 
   //         : <Button gradientDuoTone="purpleToBlue"
   //         onClick={() => handleFollow(data.mbid)}
   //       >Follow</Button>}
   // })

  
  return (
    
  <Modal show={props.show} onClose={props.onClose} dismissible={true}>
   <Table >
      <Table.Body className="divide-y w-full">
         {artists}
      </Table.Body>
      <Table.Body className="divide-y w-full">
         {disambiguations}
      </Table.Body>
      {/* <Table.Body className="divide-y w-full">
         {follows}
      </Table.Body> */}
   </Table>
  </Modal>
  )
}

export default SearchConflicts