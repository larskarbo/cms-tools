import { getPlainText } from "../rendering/getPlainText";
import { getDatabase } from "./notion";

export const getStaticPathsPost = async () => {
  const database = await getDatabase();
  const paths = database.map((page) => ({
    params: { post: getPlainText(page.properties.slug) },
  }));
  return {
    paths: paths,
    fallback: true,
  };
};
