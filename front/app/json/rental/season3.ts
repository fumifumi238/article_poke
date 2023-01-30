type Party = {
  pokemon: string;
  item: string;
  terastal: string;
};

type Rental = {
  twitter: string;
  rentalCode: string;
  party: Party[];
};

export const rental: Rental[] = [
  {
    twitter: "twitter_id",
    rentalCode: "ABCDEF",
    party: [
      { pokemon: "コノヨザル", item: "こだわりハチマキ", terastal: "ほのお" },
    ],
  },
];
