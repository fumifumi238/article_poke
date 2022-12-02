import Button from "@mui/material/Button";
import { GetStaticProps, NextPage } from "next";
import React, { FC, useEffect, useRef, useState } from "react";
import { postData } from "../lib/api/client";
import getPokeDexNumber from "../utils/getPokeDexNumber";
import Image from "next/image";
import items from "../json/items.json";
import pokeData from "../json/poke_data.json";
import { changeIcon } from "../utils/changeIcon";

type User = {
  id: number;
  name: string;
  twitter: string;
};

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const inputRef = useRef(null);
  const anotherRef = useRef(null);

  useEffect(() => {
    // validationを付けたい　https://zenn.dev/uzimaru0000/articles/json-type-validation
    // const getUser = async () => {
    //   const res = await fetch("http://localhost:3000/users/index");
    //   const data = (await res.json()) as User[];
    //   setUsers(data);
    // };

    // getUser();

    console.log(pokeData);
    let a = getPokeDexNumber("サンダー(ガラル)");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postData("/users/create", {
      name: name,
      twitter: twitter,
    });
    const data = await res;
    if (data.status !== 200) {
      console.log(data.message);
    } else {
      console.log("成功しました。");
    }
  };

  const itemToLowerCase = (item: string) => {
    const lowerItem = item.toLowerCase().replace(/\s+/g, "");
    return lowerItem;
  };

  const resetInput = (value: string) => {
    if (value === "n") {
      console.log(value);
      inputRef.current.value = "";
      anotherRef.current.focus();
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onBlur={(e) => resetInput(e.target.value)}
      />
      <input type="text" ref={anotherRef} />
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const response = await fetch("http://api:3000/posts", { method: "GET" });
//   const json = await response.json();

//   console.log()

//   return {
//     props: {
//       posts: json,
//     },
//   };
// };

export default Home;
