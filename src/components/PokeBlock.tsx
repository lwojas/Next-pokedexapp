/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { pokeHash } from "@/libs/cache";

type pokeProps = {
  key: string;
  name: string;
  url: string;
};

const PokeBlock = (props: pokeProps) => {
  const [pokeDetails, setpokeDetails] = useState<any>(null);

  async function getDetails() {
    const pokeResponse = await axios.get(props.url);
    pokeHash[props.name] = pokeResponse.data;
    setpokeDetails(pokeResponse.data);
  }

  useEffect(() => {
    if (!pokeHash[props.name]) {
      //   console.log("Api caller in pokemon block");
      getDetails();
    } else {
      setpokeDetails(pokeHash[props.name]);
    }
  }, []);

  return (
    <>
      <Link className="flex-child" href={"/detail/" + props.name}>
        <div>
          {pokeDetails ? (
            <img
              alt="Pokemon"
              src={pokeDetails.sprites.other["official-artwork"].front_default}
            />
          ) : (
            "Loading image"
          )}
          <div className="card-detail">
            <h3>{props.name}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PokeBlock;
