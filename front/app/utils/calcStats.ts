export type ButtonType = "up" | "down" | "normal";

export const calcStats = (
  baseStats: number,
  effortValue: number,
  individualValue: number,
  buttonType: string = "normal",
  level: number = 50
) => {
  let correction = () => {
    switch (buttonType) {
      case "up":
        return 1.1;
      case "down":
        return 0.9;
      default:
        return 1.0;
    }
  };
  const stats = Math.floor(
    (Math.floor(
      ((baseStats * 2 + individualValue + effortValue / 4) * level) / 100
    ) +
      5) *
      correction()
  );

  return stats;
};

export const calcHPStats = (
  baseStats: number,
  effortValue: number,
  individualValue: number,
  level: number = 50
) => {
  if (baseStats === 1) {
    return 1;
  }
  const stats =
    Math.floor(
      ((baseStats * 2 + Number(individualValue) + Number(effortValue) / 4) *
        level) /
        100
    ) +
    level +
    10;

  return stats;
};
