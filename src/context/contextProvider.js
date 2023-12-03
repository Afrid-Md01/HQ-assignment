import { useReducer } from "react";
import ContextApi from "./contextApi";

const defaultStore = {
  members: [],
  filteredMembers: [],
};

const storeReducer = (state, action) => {
  if (action.type === "ADD") {
    const members = action.members;
    return {
      members: members,
    };
  }

  if (action.type === "REMOVE") {
    const newMembers = state.members.filter(
      (member) => member.id !== action.id
    );

    return {
      members: newMembers,
    };
  }

  if (action.type === "EDIT") {
    const newMembers = [...state.members];
    const index = state.members.findIndex((memb) => memb.id === action.id);
    const object = state.members.find((memb) => memb.id === action.id);

    newMembers[index] = { ...object, isediting: true };

    return {
      members: newMembers,
    };
  }

  if (action.type === "UPDATE") {
    const newMembers = [...state.members];
    const index = state.members.findIndex((memb) => memb.id === action.user.id);

    newMembers[index] = {
      id: action.user.id,
      name: action.user.name,
      email: action.user.email,
      role: action.user.role,
    };
    return {
      members: newMembers,
    };
  }

  if (action.type === "UPDATEMANY") {
    const newMembers = [...state.members];
    const updatedMembers = action.users;

    newMembers.forEach((user, index) => {
      for (let i = 0; i < action.users.length; i++) {
        if (updatedMembers[i].id === user.id) {
          newMembers[index] = { ...updatedMembers[i] };
        }
      }
    });
    return {
      members: newMembers,
    };
  }
};

function ContextProvider(props) {
  const [store, dispatchStore] = useReducer(storeReducer, defaultStore);

  const addMembersHandler = (members) => {
    dispatchStore({ type: "ADD", members: members });
  };

  const editHandler = (id) => {
    dispatchStore({ type: "EDIT", id: id });
  };

  const deleteOneHandler = (id) => {
    dispatchStore({ type: "REMOVE", id: id });
  };

  const updateHandler = (user) => {
    dispatchStore({ type: "UPDATE", user: user });
  };

  const updateManyHandler = (users) => {
    dispatchStore({ type: "UPDATEMANY", users: users });
  };

  const contextValue = {
    members: store.members,
    addMembers: addMembersHandler,
    deleteOne: deleteOneHandler,
    edit: editHandler,
    update: updateHandler,
    updateMany: updateManyHandler,
  };

  console.log(contextValue);
  return (
    <ContextApi.Provider value={contextValue}>
      {props.children}
    </ContextApi.Provider>
  );
}

export default ContextProvider;
