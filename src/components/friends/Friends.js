import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Friends.css";
import { FriendCard } from "./FriendCard";


export const Friends = () => {




  return (
    <main>
      <section>
        <h1>Friend List</h1>
        <button>Add Friend</button>
      </section>
      <section>
        <FriendCard/>
      </section>
    </main>
  );
}