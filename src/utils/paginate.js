import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  const startIndex = currentPage * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
