import axios from "axios";
import { useState } from "react";

import Logo from "@/components/Logo";
import PokeBlock from "@/components/PokeBlock";

import { stateCache, pokeHash } from "@/libs/cache";
import CreateID from "@/libs/createID";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type globalProps = {
  resData: {
    name: string;
    url: string;
  }[];
};

export async function getStaticProps() {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=300");
  const resData = res.data.results;
  // Cache the results
  stateCache.homeState = resData;

  return {
    props: {
      resData,
    },
  };
}

export default function Home(props: globalProps) {
  return (
    <div className="poster-wrapper">
      <Logo />
      <div className="flex-row poke-list">
        {props.resData.map((pokemon: any, index: number) => {
          return (
            <PokeBlock key={CreateID()} name={pokemon.name} url={pokemon.url} />
          );
        })}
      </div>
    </div>
  );
}
