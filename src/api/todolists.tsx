import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const settings = {
  withCredentials: true,
  headers: {
    "api-key": "d83db838-fc8d-43ce-b06e-7535b34c286a",
  },
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

export const CreateTodolists = (props: Props) => {
  const [state, setState] = useState(null);
  console.log(state);
  useEffect(() => {
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.1/todo-lists`,
        { title: "what to learn" },
        settings
      )
      .then((res) => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
