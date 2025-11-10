import WordPressHeader from "./WordPressHeader";
import { getHeaderHTML } from "@/lib/graphql";

export default async function Header() {
  const headerHTML = await getHeaderHTML();

  return <WordPressHeader headerHTML={headerHTML} />;
}

