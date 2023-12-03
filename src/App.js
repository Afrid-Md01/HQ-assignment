import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import ContextApi from "../src/context/contextApi";
import Navbar from "./components/navbar/navbar";
import Members from "./components/body/members";
import styles from "./App.module.css";
import Pagination from "./components/pagination/pagination";

function App() {
  const contextApi = useContext(ContextApi);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = Axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const result = await fetchData;
        contextApi.addMembers(result.data);
      } catch (err) {
        alert("data not found");
      }
    };
    getData();
  }, []);

  const [currPage, setCurrPage] = useState(1);
  const [postsPerPage] = useState(10);

  //get current posts
  const indexOfLastPost = currPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = contextApi.members.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  //pagination
  const paginate = (pageNumber) => setCurrPage(pageNumber);

  const incrementPage = (pageNumber) => setCurrPage(pageNumber + 1);

  const decrementPage = (pageNumber) => setCurrPage(pageNumber - 1);

  const jumpToLast = () =>
    setCurrPage(Math.ceil(contextApi.members.length / postsPerPage));

  const jumpToFirst = () => setCurrPage(1);

  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      <main className={styles.mainbody}>
        <Members posts={currentPosts} />
      </main>
      <footer>
        <Pagination
          postsPerPage={postsPerPage}
          paginate={paginate}
          incrementPage={incrementPage}
          currPage={currPage}
          decrementPage={decrementPage}
          jumpLast={jumpToLast}
          jumpFirst={jumpToFirst}
        />
      </footer>
    </React.Fragment>
  );
}

export default App;
