// Library import
import axios from "axios";
import { useState } from "react";
import { Inter } from "next/font/google";

// Component import
import Logo from "@/components/Logo";
import PokeBlock from "@/components/PokeBlock";
import Filter from "@/components/Filter";

// Local import
import { stateCache, pokeHash } from "@/libs/cache";
import CreateID from "@/libs/uuid";

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
  const [pokeList, setPokeList] = useState<any>(props.resData);
  const [backupList, setBackupList] = useState<any>(props.resData);

  const startFilter = (query: string) => {
    if (pokeList) {
      const filterList = backupList.filter((item: any) => {
        if (item.name.startsWith(query)) {
          console.log(item);
          return item;
        }
      });
      setPokeList(filterList);
    }
  };

  return (
    <div className="poster-wrapper">
      <Logo />
      <Filter callBack={startFilter} />
      <div className="flex-row poke-list">
        {pokeList.map((pokemon: any, index: number) => {
          return (
            <PokeBlock key={CreateID()} name={pokemon.name} url={pokemon.url} />
          );
        })}
      </div>
    </div>
  );
}
