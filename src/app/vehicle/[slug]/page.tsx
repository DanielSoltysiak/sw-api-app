import { VehicleData } from "@/types/vehicle";
import styles from "../../page.module.css";
import Link from "next/link";
import { getSlugs } from "@/utils/getSlugs";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export async function generateStaticParams() {
  const slugs = await getSlugs("vehicles");
  return slugs;
}

async function getVehicle(slug: string) {
  const res = await fetch(`https://swapi.dev/api/vehicles/${slug}`);
  const data = await res.json();
  const vehicle: VehicleData = {
    name: data.name,
    type: data.vehicle_class,
    characters: [],
  };
  const characters = await Promise.all(
    data.pilots.map(async (url: string) => {
      const res = await fetch(url);
      const characterData = await res.json();
      return { name: characterData.name, url: characterData.url };
    })
  );
  vehicle.characters = characters;
  return vehicle;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicle(params.slug);
  const { name, type, characters } = vehicle;

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <ImageWithFallback
          src={`/${name}.jpg`}
          alt={name}
          style={{ borderRadius: 8 }}
        />
        <p>Name: {name}</p>
        <p>Type: {type || "No data"}</p>
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
