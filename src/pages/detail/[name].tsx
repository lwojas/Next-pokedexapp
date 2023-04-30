import { useRouter } from "next/router";

import { pokeHash } from "@/libs/cache";
import { useEffect, useState } from "react";

type pokeType = {
  pokeInfo: any;
  pokeBio: any;
  pokeAbilities: any;
};

const PokeDetail = () => {
  let abilities = [];

  const [pokeDetails, setpokeDetails] = useState<pokeType>({
    pokeInfo: "",
    pokeBio: "",
    pokeAbilities: "",
  });

  useEffect(() => {
    setpokeDetails({ ...pokeDetails, pokeInfo: pokeHash[name as string] });
  }, []);

  const router = useRouter();
  const { name } = router.query;

  console.log(router.query.name);
  console.log(pokeHash[name as string]);
  return (
    <div className="poke-card">
      {/* {console.log(pokeDetails)} */}
      {pokeDetails.pokeInfo ? (
        <div>
          <div className="flex-row poke-card-header">
            <h1>{name}</h1>
            <h3>
              HP{" "}
              <span className="h3-large">
                {pokeDetails.pokeInfo.stats[0].base_stat}
              </span>
            </h3>
          </div>

          <img
            alt="Pokemon"
            src={
              pokeDetails.pokeInfo.sprites.other["official-artwork"]
                .front_default
            }
          />
          <div className="flex-row margin-center poke-card-vitals">
            <p>
              <b>Weight: </b>
              {pokeDetails.pokeInfo.weight / 10} kg,
            </p>
            <p>
              <b>Height: </b>
              {pokeDetails.pokeInfo.height / 10} m
            </p>
          </div>
          <div className="poke-ability">
            {pokeDetails.pokeInfo.abilities.map((item: any, index: number) => (
              <div key={index} className="flex-row">
                <p>
                  {" "}
                  {item.ability.name}{" "}
                  <span>
                    {console.log(pokeDetails.pokeInfo)}
                    {pokeDetails.pokeAbilities
                      ? pokeDetails.pokeAbilities[index].effect_entries[1]
                          .short_effect
                      : ""}
                  </span>
                </p>
              </div>
            ))}
          </div>
          {/* <p className="p-bio">
            {pokeDetails.pokeBio.flavor_text_entries[1].flavor_text}
          </p> */}
        </div>
      ) : (
        <p>Loading image...</p>
      )}
      {/* <img alt="Pokemon" src={pokeDetails.sprites.defaultFront} /> */}
    </div>
  );
};

export default PokeDetail;
