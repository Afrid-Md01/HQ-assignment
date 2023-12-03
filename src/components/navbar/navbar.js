import React, { useContext, useRef } from "react";
import Axios from "axios";
import ContextApi from "../../context/contextApi";
import { Trash, Search } from "lucide-react";
import styles from "./navbar.module.css";

function Navbar() {
  const contextApi = useContext(ContextApi);
  const searchRef = useRef("");

  const selected = contextApi.members.filter((mem) => mem.isChecked === true);

  console.log(selected);

  const deleteMultiple = () => {
    const newUsers = contextApi.members.filter(
      (user) => user.isChecked !== true
    );
    contextApi.addMembers(newUsers);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchRef.current.value !== "") {
      const searchedArray = contextApi.members.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchRef.current.value) ||
          item.email.toLowerCase().includes(searchRef.current.value) ||
          item.role.toLowerCase().includes(searchRef.current.value)
        );
      });
      console.log("Search :", searchedArray);
      contextApi.addMembers(searchedArray);
      searchRef.current.value = "";
    } else {
      Axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      ).then((result) => {
        contextApi.addMembers(result.data);
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <form className={styles.searchForm} onSubmit={searchHandler}>
        <input
          className={styles.searchInput}
          placeholder="Search a member"
          ref={searchRef}
        />
        <button className={styles["search-button"]} type="submit">
          <Search className={styles["search-icon"]} />
          <span className={styles.searchText}>Search</span>
        </button>
      </form>
      <span className={styles.deleteBtnSpan}>
        {selected.length > 0 ? (
          <button className={styles["delete-button1"]} onClick={deleteMultiple}>
            <Trash className={styles["delete-icon"]} />
          </button>
        ) : (
          <button className={styles["delete-button2"]}>
            <Trash className={styles["delete-icon"]} />
          </button>
        )}
      </span>
    </nav>
  );
}

export default Navbar;
