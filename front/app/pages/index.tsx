import React, { FC, useEffect, useState } from "react";
import { GetStaticProps } from "next";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

type User = {
  id: number;
  name: string;
  twitter: string;
};


const Home: FC<Props> = (props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // validationを付けたい　https://zenn.dev/uzimaru0000/articles/json-type-validation
    const getUser = async () => {
      const res = await fetch("http://localhost:3000/users/index");
      const data = (await res.json()) as User[];
      setUsers(data);
    };

    getUser();
  }, []);

  return (
    <div>
      <h2>POSTの一覧</h2>
      <ul>
        {props.posts.map((post) => (
          <div key={post.id}>
            <li>
              {post.id}: {post.title}
            </li>
          </div>
        ))}
      </ul>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            name: {user.name} id: @{user.twitter}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("http://api:3000/posts", { method: "GET" });
  const json = await response.json();

  return {
    props: {
      posts: json,
    },
  };
};

export default Home;
