import React, { useContext, useState } from "react";
import { CheckCircle, Edit, Trash } from "lucide-react";
import styles from "./members.module.css";
import ContextApi from "../../context/contextApi";

function Members({ posts }) {
  const contextApi = useContext(ContextApi);

  const [change, setChange] = useState({});

  const editHandler = (user) => {
    contextApi.edit(user.id);
    setChange(user);
  };

  const deleteHandler = (id) => {
    contextApi.deleteOne(id);
  };

  const editchanges = (e) => {
    e.preventDefault();

    let promise = new Promise((res, rej) => {
      contextApi.update(change);
      res();
    });
    promise.then(() => {
      setChange({});
    });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const currentUsers = [];

      for (let i = 0; i < posts.length; i++) {
        currentUsers.push({ ...posts[i], isChecked: checked });
      }

      contextApi.updateMany(currentUsers);

      console.log("All Select :", currentUsers);
    } else {
      const tempUsers = contextApi.members.map((user) =>
        user.email === name ? { ...user, isChecked: checked } : user
      );

      contextApi.addMembers(tempUsers);
    }
  };

  return (
    <div className={styles.content}>
      <ul>
        <li key="heading">
          <span className={styles.headingcheckboxSpan}>
            <input
              type="checkbox"
              className={styles.checkbox}
              name="allSelect"
              onChange={handleCheckbox}
              checked={posts.filter((user) => user?.isChecked !== true).length < 1}
            />
          </span>
          <span className={styles.headingnameSpan}>Name</span>
          <span className={styles.headingemailSpan}>Email</span>
          <span className={styles.headingroleSpan}>Role</span>
          <span className={styles.headingactionsSpan}>Actions</span>
        </li>
        {posts.map((user) => {
          if (user.isediting) {
            return (
              <li key={user.id}>
                <form style={{ display: "flex" }} onSubmit={editchanges}>
                  <span className={styles.checkboxSpan}>
                    <input type="checkbox" className={styles.checkbox} />
                  </span>
                  <span className={styles.nameSpan}>
                    <input
                      className={styles.input}
                      value={change.name}
                      onChange={(e) =>
                        setChange({ ...change, name: e.target.value })
                      }
                    />
                  </span>
                  <span className={styles.emailSpan}>
                    <input
                      className={styles.input}
                      value={change.email}
                      onChange={(e) =>
                        setChange({ ...change, email: e.target.value })
                      }
                    />
                  </span>
                  <span className={styles.roleSpan}>
                    <input
                      className={styles.input}
                      value={change.role}
                      onChange={(e) =>
                        setChange({ ...change, role: e.target.value })
                      }
                    />
                  </span>
                  <span className={styles.actionsSpan}>
                    <button className={styles.edit} type="submit">
                      <CheckCircle className={styles["check-icon"]} />
                    </button>
                  </span>
                </form>
              </li>
            );
          } else {
            return (
              <li key={user.id}>
                <span className={styles.checkboxSpan}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name={user.email}
                    onChange={handleCheckbox}
                    checked={user?.isChecked || false}
                  />
                </span>
                <span className={styles.nameSpan}>
                  {user.name}
                </span>
                <span className={styles.emailSpan}>{user.email}</span>
                <span className={styles.roleSpan}>{user.role}</span>
                <span className={styles.actionsSpan}>
                  <button
                    className={styles.edit}
                    onClick={() => editHandler(user)}
                  >
                    <Edit />
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => deleteHandler(user.id)}
                  >
                    <Trash className={styles["trash-icon"]} />
                  </button>
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Members;
