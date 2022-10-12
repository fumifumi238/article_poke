import React, { FC } from "react";
import { GetStaticProps } from "next";

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: FC<Props> = (props) => {
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
