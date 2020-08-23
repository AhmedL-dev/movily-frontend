export function sortText(a, b, textProperty) {
  var nameA = a[textProperty].toUpperCase(); // ignore upper and lowercase
  var nameB = b[textProperty].toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export function sortValue((valueProperty) => a, b {
  return a[valueProperty] - b[valueProperty];
}
