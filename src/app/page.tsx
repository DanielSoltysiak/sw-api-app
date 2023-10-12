import styles from "./page.module.css";
import CharacterCard from "@/components/Card";
import getList from "@/utils/getList";

export default async function Home() {
  const characters = await getList("people");

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {characters.map((character) => (
          <CharacterCard
            type="character"
            name={character.name}
            url={character.url}
            key={character.url}
          />
        ))}
      </div>
    </main>
  );
}
