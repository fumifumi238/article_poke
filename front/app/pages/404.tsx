import { useRouter } from "next/router";

const CustomErrorPage = () => {
  const router = useRouter();

  return <>{router.asPath} ページは存在しません</>;
};

export default CustomErrorPage;
