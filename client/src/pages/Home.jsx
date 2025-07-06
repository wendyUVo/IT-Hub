import React from "react";
import HeaderImage from "../components/HeaderImage";
import Layout from "../components/Layout";
import NavBar from "../components/Navbar";
import PostsList from "../components/PostsList";

function Home() {
  return (
    <>
      <HeaderImage />
      <Layout>
        <NavBar />
        <div>Loading Posts ....</div>
        <PostsList />
      </Layout>
    </>
  );
}

export default Home;
