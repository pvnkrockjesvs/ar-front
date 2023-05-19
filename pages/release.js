import React from "react";
import Release from "../components/Release";
import Head from "next/head";

function ReleasePage() {
  return (
    <>
      <Head>
        <title>Release Page</title>
      </Head>
      <Release />
    </>
  );
}

export default ReleasePage;
