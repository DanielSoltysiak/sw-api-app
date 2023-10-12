import { FetchTypes } from "@/types/fetchTypes";

async function getList(type: keyof typeof FetchTypes) {
  let results = [];
  let next = `https://swapi.dev/api/${type}`;

  do {
    const res = await fetch(next);
    const json = await res.json();
    results.push(...json.results);
    next = json.next;
  } while (next);

  const list = results.map((elem) => ({
    name: elem.name,
    url: elem.url,
  }));
  list.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  return list;
}

export default getList;
