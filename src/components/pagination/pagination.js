import React, { useContext, useState } from "react";
import ContextApi from "../../context/contextApi";
import { SkipForward, SkipBack } from "lucide-react";
import "./pagination.css";

function Pagination({
  postsPerPage,
  paginate,
  incrementPage,
  currPage,
  decrementPage,
  jumpLast,
  jumpFirst,
}) {
  const [activePage, setActivePage] = useState(1);

  const contextApi = useContext(ContextApi);

  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(contextApi.members.length / postsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (Math.ceil(contextApi.members.length / postsPerPage) !== currPage) {
      incrementPage(currPage);
      setActivePage(currPage + 1);
    }
  };

  const prevPage = () => {
    if (currPage !== 1) {
      decrementPage(currPage);
      setActivePage(currPage - 1);
    }
  };

  const jumpToLast = () => {
    setActivePage(Math.ceil(contextApi.members.length / postsPerPage));
    jumpLast();
  };

  const jumpToFirst = () => {
    setActivePage(1);
    jumpFirst();
  };

  const selected = contextApi.members.filter((user) => user.isChecked === true);

  return (
    <div className="footer">
      <div className="selected">
        <span>
          {selected.length} of {contextApi.members.length} selected
        </span>
      </div>
      <div className="pagination">
        <div className="preBtns">
          <button className="first-page" onClick={jumpToFirst}>
            <SkipBack className="skipback" />
            first page
          </button>
          <button className="previous-page" onClick={prevPage}>
            prev
          </button>
        </div>
        <ul className="pageNumbersList_items">
          {pageNumbers.map((number) => {
            return (
              <li
                key={number}
                className={`pageNumbersList_item_${
                  activePage === number ? "active" : ""
                }`}
              >
                <span className="page-link">{number}</span>
              </li>
            );
          })}
        </ul>
        <div className="postBtns">
          <button className="next-page" onClick={nextPage}>
            next
          </button>
          <button className="last-page" onClick={jumpToLast}>
            last page
            <SkipForward className="skipforward" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
