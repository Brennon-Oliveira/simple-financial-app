type Permissibility = "strict" | "soft" | "contain" | "loose" | "fuzzy";

function cleanString(str: string) {
  if (!str) return "";

  return str
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array.from(
    {
      length: b.length + 1,
    },
    (_, i) => [i]
  );
  for (let j = 0; j < a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}

function checkFuzzyIncludes(
  haystackParam: string,
  needleParam: string,
  threshold: number = 0.75
) {
  if (haystackParam.includes(needleParam)) return true;

  let haystack = haystackParam;
  let needle = needleParam;

  if (needle.length > haystack.length) {
    haystack = needleParam;
    needle = haystackParam;
  }

  const len = needle.length;

  for (let i = 0; i <= haystack.length - len; i++) {
    const substring = haystack.substring(i, i + len);

    const distance = levenshtein(needle, substring);
    const similarity = (len - distance) / len;

    if (similarity >= threshold) {
      return true;
    }
  }
  return false;
}

// function checkFuzzyMatch(
//   a: string,
//   b: string,
//   threshold: number = 0.75
// ): boolean {
//   if (Math.abs(a.length - b.length) > 3) return false;
//   if (a.includes(b) || b.includes(a)) return true;

//   const matrix: number[][] = [];

//   for (let i = 0; i <= b.length; i++) matrix[i] = [i];
//   for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

//   for (let i = 1; i <= b.length; i++) {
//     for (let j = 1; j <= a.length; j++) {
//       if (b.charAt(i - 1) === a.charAt(j - 1)) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = Math.min(
//           matrix[i - 1][j - 1] + 1,
//           Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
//         );
//       }
//     }
//   }

//   const distance = matrix[b.length][a.length];
//   const longest = Math.max(a.length, b.length);
//   const similarity = (longest - distance) / longest;

//   return similarity >= threshold;
// }

export function compareStrings(
  a: string,
  b: string,
  level: Permissibility = "loose"
): boolean {
  if (!a || !b) return false;

  if (level === "strict") {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  const _a = cleanString(a);
  const _b = cleanString(b);

  if (!_a || !_b) return false;

  switch (level) {
    case "soft":
      return _a === _b;
    case "contain":
      return _a.includes(_b);
    case "loose":
      return _a.includes(_b) || _b.includes(_a);
    case "fuzzy":
      return checkFuzzyIncludes(_a, _b);
    default:
      return _a === _b;
  }
}
