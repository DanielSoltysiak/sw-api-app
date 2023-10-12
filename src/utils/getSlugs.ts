import { FetchTypes } from "@/types/fetchTypes";
import { getSlug } from "./getSlug";

export async function getSlugs(type: keyof typeof FetchTypes) {
  let results = [];
  let next = `https://swapi.dev/api/${type}`;

  do {
    const res = await fetch(next);
    const json = await res.json();
    results.push(...json.results);
    next = json.next;
  } while (next);

  const urls = results.map((elem) => elem.url);

  const slugs = urls.map((elem) => ({
    slug: getSlug(elem),
  }));

  return slugs;
}
