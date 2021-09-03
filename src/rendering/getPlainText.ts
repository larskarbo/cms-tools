export const getPlainText = (cell) => {
  if (cell?.type == "title") {
    return cell?.title?.[0]?.plain_text;
  }
  return cell?.rich_text?.[0]?.plain_text || "";
};
