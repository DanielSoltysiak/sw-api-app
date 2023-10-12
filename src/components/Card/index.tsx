import Link from "next/link";
import styles from "../../app/page.module.css";
import { ImageWithFallback } from "../ImageWithFallback";
import { getSlug } from "@/utils/getSlug";

interface Props {
  type: "character" | "planet" | "vehicle";
  name: string;
  url: string;
}

const Card = ({ type, name, url }: Props) => {
  return (
    <Link href={`/${type}/${getSlug(url)}`} key={name}>
      <div className={styles.card}>
        <ImageWithFallback
          src={`/${name}.jpg`}
          alt={name}
          style={{ borderRadius: 8 }}
        />
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default Card;
