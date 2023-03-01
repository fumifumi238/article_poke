import { useRouter } from "next/router";

const CustomErrorPage = () => {
  const router = useRouter();

  return (
    <>
      <p>そのページは存在しません</p>
      <a href="/">トップページへ戻る</a>
    </>
  );
};

export default CustomErrorPage;
