import styles from "../page.module.css";
import PlanetCard from "@/components/Card";
import getList from "@/utils/getList";

export default async function Home() {
  const planets = await getList("people");

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {planets.map((planet) => (
          <PlanetCard
            type="planet"
            name={planet.name}
            url={planet.url}
            key={planet.url}
          />
        ))}
      </div>
    </main>
  );
}
