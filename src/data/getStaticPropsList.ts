import { getDatabase } from "./notion";

export const getStaticPropsList = async () => {
  const database = await getDatabase();

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
