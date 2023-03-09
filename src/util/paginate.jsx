import _ from "lodash";

export function paginate(items, currPage, pageSize) {
  const startIndex = (currPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
