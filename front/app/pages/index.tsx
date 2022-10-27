import { NextPage } from "next";
import React, { FC, useEffect, useState } from "react";
// import { GetStaticProps } from "next";
import { postData } from "../lib/api/client";


type User = {
  id: number;
  name: string;
  twitter: string;
};

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");

  useEffect(() => {
    // validationを付けたい　https://zenn.dev/uzimaru0000/articles/json-type-validation
    const getUser = async () => {
      const res = await fetch("http://localhost:3000/users/index");
      const data = (await res.json()) as User[];
      setUsers(data);
    };

    getUser();
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

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            name: {user.name} id: @{user.twitter}
          </li>
        ))}
      </ul>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={twitter}
          onChange={(e) => {
            setTwitter(e.target.value);
          }}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const response = await fetch("http://api:3000/posts", { method: "GET" });
//   const json = await response.json();

//   return {
//     props: {
//       posts: json,
//     },
//   };
// };

export default Home;
