import { PlanetData } from "@/types/platnet";
import styles from "../../page.module.css";
import Link from "next/link";
import { getSlugs } from "@/utils/getSlugs";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export async function generateStaticParams() {
  const slugs = await getSlugs("planets");
  return slugs;
}

async function getPlanet(slug: string) {
  const res = await fetch(`https://swapi.dev/api/planets/${slug}`);
  const data = await res.json();
  const planet: PlanetData = {
    name: data.name,
    population: data.population,
    characters: [],
  };
  const characters = await Promise.all(
    data.residents.map(async (url: string) => {
      const res = await fetch(url);
      const characterData = await res.json();
      return { name: characterData.name, url: characterData.url };
    })
  );
  planet.characters = characters;
  return planet;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const planet = await getPlanet(params.slug);
  const { name, population, characters } = planet;

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <ImageWithFallback
          src={`/${name}.jpg`}
          alt={name}
          style={{ borderRadius: 8 }}
        />
        <p>Name: {name}</p>
        <p>Population: {population || "No data"}</p>
        <p>
          Characters:{" "}
          {characters.length
            ? characters.map((character) => (
                <Link
                  href={`/character/${character.url.replace(/[^0-9]/g, "")}`}
                  key={character.name}
                >
                  {character.name}
                </Link>
              ))
            : "No data"}
        </p>
      </div>
    </div>
  );
}
