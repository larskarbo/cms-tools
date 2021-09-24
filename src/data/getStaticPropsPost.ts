import axios from "axios";
import { getBlocks, getIdFromSlug, getPage } from "./notion";
import forceEnv from "force-env";
import { getErrorMessage } from "get-error-message";


const getImageMetaInfo = async (url) => {
  return await axios({
    method: "GET",
    // url: "https://fast-image-probe-metainfo.p.rapidapi.com/img-metainfo",
    url: "https://img-metainfo.larskarbo.no/img-metainfo",
    params: { url },
    headers: {
      'x-rapidapi-host': 'fast-image-probe-metainfo.p.rapidapi.com',
      'x-rapidapi-key': forceEnv("RAPID_API_KEY"),
      'fav-animal': "horse"
    }
  }).then((a) => a.data)
  .catch(e => {
    console.log("Image Meta Info retrieval failed: " + getErrorMessage(e));
    return null
  })
};

export const getStaticPropsPost = async (context) => {
  const { post } = context.params;
  const id = await getIdFromSlug(post);
  if (!id) {
    return {
      notFound: true,
    };
  }
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await pSeries(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithImages = await Promise.all(
    blocks.map(async (block) => {
      if (block.type === "image") {
        const value = block[block.type];
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        return {
          ...block,
          imgMetaInfo: await getImageMetaInfo(src),
        };
      }
      return block;
    })
  );

  const blocksWithChildren = blocksWithImages.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      articleData: {
        page,
        blocks: blocksWithChildren,
      },
    },
    revalidate: 1,
  };
};