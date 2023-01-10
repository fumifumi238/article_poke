const nature = {
  いじっぱり: 10200,
  うっかりや: 120,
  おくびょう: 20001,
  おだやか: 20010,
  おっとり: 2100,
  おとなしい: 2010,
  さみしがり: 12000,
  しんちょう: 210,
  ずぶとい: 21000,
  せっかち: 2001,
  なまいき: 12,
  のうてんき: 1020,
  のんき: 1002,
  ひかえめ: 20100,
  まじめ: 0,
  むじゃき: 21,
  やんちゃ: 10020,
  ゆうかん: 10002,
  ようき: 201,
  れいせい: 102,
  わんぱく: 1200,
};

const natureList = {
  0: "まじめ",
  10002: "ゆうかん",
  1002: "のんき",
  10020: "やんちゃ",
  102: "れいせい",
  1020: "のうてんき",
  10200: "いじっぱり",
  12: "なまいき",
  120: "うっかりや",
  1200: "わんぱく",
  12000: "さみしがり",
  20001: "おくびょう",
  2001: "せっかち",
  20010: "おだやか",
  201: "ようき",
  2010: "おとなしい",
  20100: "ひかえめ",
  21: "むじゃき",
  210: "しんちょう",
  2100: "おっとり",
  21000: "ずぶとい",
};

export const getNatureToNumber = (value: string): number[] => {
  if (nature[value] !== undefined) {
    const arr = String(nature[value]).padStart(5, "0").split("").map(Number);
    return arr;
  }

  return [0, 0, 0, 0, 0];
};

export const getNature = (natureToNumber: number[]): string => {
  const countArr = {
    "1": 0,
    "0": 0,
    "2": 0,
  };

  natureToNumber.forEach((num) => {
    if (countArr[num] !== undefined) {
      countArr[num] += 1;
    }
  });

  if (countArr[0] === 5) {
    return "まじめ";
  }

  if (countArr[1] !== 1 || countArr[2] !== 1) {
    return "まじめ";
  }

  let sum = 0;
  for (let i = 0; i < natureToNumber.length; i++) {
    sum += 10 ** (4 - i) * natureToNumber[i];
  }

  return natureList[sum];
};
