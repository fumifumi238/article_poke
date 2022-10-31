const addform = (pokemon: string) => {
  let form = "";

  switch (true) {
    case /アローラ/.test(pokemon):
      form = "a";
      break;
    case /ガラル/.test(pokemon):
      form = "g";
      break;
    case /アタック/.test(pokemon):
      form = "a";
      break;
    case /ディフェンス/.test(pokemon):
      form = "d";
      break;
    case /スピード/.test(pokemon):
      form = "s";
      break;
    case /すな/.test(pokemon):
      form = "s";
      break;
    case /ゴミ/.test(pokemon):
      form = "d";
      break;
    case /ウオッシュ/.test(pokemon):
      form = "h";
      break;
    case /フロスト/.test(pokemon):
      form = "f";
      break;
    case /スピン/.test(pokemon):
      form = "s";
      break;
    case /オリジン/.test(pokemon):
      form = "o";
      break;
    case /スカイ/.test(pokemon):
      form = "s";
      break;
    case /あお/.test(pokemon):
      form = "f";
      break;
    case /れいじゅう/.test(pokemon):
      form = "a";
      break;
    case /ホワイト/.test(pokemon):
      form = "w";
      break;
    case /ブラック/.test(pokemon):
      form = "b";
      break;
    case /かくご/.test(pokemon):
      form = "k";
      break;
    case /♀/.test(pokemon):
      form = "f";
      break;
    case /とくだい/.test(pokemon):
      form = "k";
      break;
    case /おおきい/.test(pokemon):
      form = "l";
      break;
    case /ちいさい/.test(pokemon):
      form = "s";
      break;
    case /10%/.test(pokemon):
      form = "t";
      break;
    case /ふらふら/.test(pokemon):
      form = "f";
      break;
    case /まいまい/.test(pokemon):
      form = "m";
      break;
    case /ぱちぱち/.test(pokemon):
      form = "p";
      break;
    case /たそがれ/.test(pokemon):
      form = "d";
      break;
    case /まよなか/.test(pokemon):
      form = "f";
      break;
    case /にっしょく/.test(pokemon):
      form = "s";
      break;
    case /げっしょく/.test(pokemon):
      form = "m";
      break;
    case /ロー/.test(pokemon):
      form = "f";
      break;
    case /れんげき/.test(pokemon):
      form = "r";
      break;
    case /はくば/.test(pokemon):
      form = "w";
      break;
    case /こくば/.test(pokemon):
      form = "b";
      break;
    default:
      break;
  }
  return form;
};

export default addform;
