import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import pokeData from "../json/poke_data.json";
import sample from "../json/sampleArticle.json";
import { postData } from "../lib/api/fetchApi";

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
    Object.keys(pokeData).forEach((data) => {
      let sum = 0;
      for (let i = 0; i < 6; i++) {
        sum += pokeData[data].baseStats[i];
      }

      if (sum !== pokeData[data].baseStats[6]) {
        console.log(data);
      }
    });
  }, []);

  const handleSubmit = async () => {
    const params = sample[0];
    console.log(params);
    const res = await postData("/articles/create", params);
    const data = await res;
    if (data.status !== 200) {
      console.log(data.message);
    } else {
      console.log("成功しました。");
    }
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
      <button onClick={handleSubmit}>送信</button>
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
