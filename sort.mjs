function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let leftSide = mergeSort(arr.splice(0, Math.floor(arr.length / 2)));
  let rightSide = mergeSort(arr);

  let auxArr = [];
  while (true) {
    auxArr.push((leftSide[0] < rightSide[0] ? leftSide : rightSide).shift());

    if (!rightSide.length || !leftSide.length) {
      return [...auxArr, ...(!rightSide.length ? leftSide : rightSide)];
    }
  }
}

export function sort(arr, removeDuplicates = false) {
  const auxArr = removeDuplicates ? [...new Set(arr)] : [...arr];

  return mergeSort(auxArr);
}
