import { Article } from "./../../types/articleTypes";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const nodemailer = require("nodemailer");

  const body = req.body as Article;

  const addText = () => {
    let text = "";
    text += "{";
    text += `
    tn: "${body.tn}",
    twitter: "${body.twitter}",
    url: "${body.url}",
    title: "${body.title}",
    rate: ${body.rate},
    rank: ${body.rank},
    season: ${body.season},
    rental: "${body.rental}",
    format: "${body.format}",
    `;

    text += "party: [\n";

    for (let i = 0; i < body.party.length; i++) {
      let moves = "";
      for (let j = 0; j < body.party[i].moves.length; j++) {
        if (j >= 3) {
          moves += `"${body.party[i].moves[j]}"`;
        } else {
          moves += `"${body.party[i].moves[j]}",`;
        }
      }
      text += `{
        id: ${i + 1},
        pokemon: "${body.party[i].pokemon}",
        item: "${body.party[i].item}",
        ability: "${body.party[i].ability}",
        nature: "${body.party[i].nature}",
        terastal: "${body.party[i].terastal}",
        moves: [${moves}],
        effortValues: [${body.party[i].effortValues}],
        individualValues: [${body.party[i].individualValues}],
      },\n`;
    }

    text += "]\n},";
    return text;
  };

  const mailText = addText();
  console.log(mailText);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      // メールアドレス
      user: process.env.NEXT_PUBLIC_MAIL_USER,
      // 16桁のアプリパスワード
      // !!サーバーの環境関数に保存すべきでしょう!!
      pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.NEXT_PUBLIC_MAIL_USER,
      to: process.env.NEXT_PUBLIC_MAIL_USER,
      subject: "try nodemailer",
      text: mailText,
    },
    function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: String(error) });
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(200).json({ message: "success" });
      }
    }
  );
};
