import styles from "../page.module.css";
import VehicleCard from "@/components/Card";
import getList from "@/utils/getList";

export default async function Home() {
  const vehicles = await getList("vehicles");

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {vehicles.map((vehicle) => (
          <VehicleCard
            type="vehicle"
            name={vehicle.name}
            url={vehicle.url}
            key={vehicle.url}
          />
        ))}
      </div>
    </main>
  );
}
