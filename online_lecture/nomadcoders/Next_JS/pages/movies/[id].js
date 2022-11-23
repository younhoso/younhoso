import { useRouter } from "next/router";

function Detail() {
  const router = useRouter();
  console.log(router);
  return "Detail"
};

export default Detail;