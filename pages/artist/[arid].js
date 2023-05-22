import React from "react";
import Artist from "../../components/Artist";
import Head from "next/head";

function ArtistPage() {
  return (
    <>
      <Head>
        <title>Artist Page</title>
      </Head>

      <Artist />
    </>
  );
}

export default ArtistPage;
