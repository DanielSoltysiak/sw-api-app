import { CharacterDetailsData } from "@/types/character";
import styles from "../../page.module.css";
import Link from "next/link";
import { getSlugs } from "@/utils/getSlugs";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export async function generateStaticParams() {
  const slugs = await getSlugs("people");
  return slugs;
}

async function getCharacter(slug: string) {
  const res = await fetch(`https://swapi.dev/api/people/${slug}`);
  const data = await res.json();
  const character: CharacterDetailsData = {
    name: data.name,
    planet: { url: "" },
    vehicles: [],
    race: [],
    url: data.url,
  };

  const planetData = await fetch(data.homeworld);
  const planet = await planetData.json();
  character.planet = { name: planet.name, url: planet.url };

  const vehicles = await Promise.all(
    data.vehicles.map(async (url: string) => {
      const res = await fetch(url);
      const vehiclesData = await res.json();
      return { name: vehiclesData.name, url: vehiclesData.url };
    })
  );
  character.vehicles = vehicles;

  const race = await Promise.all(
    data.species.map(async (url: string) => {
      const res = await fetch(url);
      const raceData = await res.json();
      return { name: raceData.name, url: raceData.url };
    })
  );
  character.race = race;

  return character;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const character = await getCharacter(params.slug);
  const { name, planet, vehicles, race } = character;

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <ImageWithFallback
          src={`/${name}.jpg`}
          alt={name}
          style={{ borderRadius: 8 }}
        />
        <p>Name: {name}</p>
        <p>
          Planet:{" "}
          {(
            <Link href={`/planet/${planet.url.replace(/[^0-9]/g, "")}`}>
              {planet.name}
            </Link>
          ) || "No data"}
        </p>
        <p>
          Vehicles:{" "}
          {vehicles.length
            ? vehicles.map((vehicle) => (
                <Link
                  href={`/vehicle/${vehicle.url.replace(/[^0-9]/g, "")}`}
                  key={vehicle.name}
                >
                  {vehicle.name}
                </Link>
              ))
            : "No data"}
        </p>
        <p>Race: {race.length ? race.map((race) => race.name) : "No data"}</p>
      </div>
    </div>
  );
}
