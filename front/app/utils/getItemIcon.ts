import items from "../json/items.json";

export const getItemIcon = (item: string) => {
  if (items[item] !== undefined) {
    const lowerItem = items[item].replace(/\s+/g, "").toLowerCase();
    return `/image/items/${lowerItem}.png`;
  }

  return "/image/ball/pokemonball.png";
};
