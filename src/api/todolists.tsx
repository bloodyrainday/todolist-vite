import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const settings = {
  withCredentials: true,
};

export const GetTodolists = (props: Props) => {
  const [state, setState] = useState(null);
  console.log(state);
  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
      .then((res) => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
