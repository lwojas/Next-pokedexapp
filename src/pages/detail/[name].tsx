import { useRouter } from "next/router";

import { pokeHash } from "@/libs/cache";
import { useEffect, useState } from "react";

const PokeDetail = () => {
  //   const;

  const router = useRouter();
  const { name } = router.query;

  console.log(router.query.name);
  console.log(pokeHash[name as string]);
  return <p>Post: {name}</p>;
};

export default PokeDetail;
