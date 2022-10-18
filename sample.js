const hash = { season:{rank:{poke:{waza: {}, item: {},ability:{},type:{}}} }};


// const hash = {};
// const arr = [
//   "きょうじゅうざん",
//   "でんこうせっか",
//   "つるぎのまい",
//   "かみなりのきば",
//   "インファイト",
//   "せいなるつるぎ",
//   "かみくだく",
//   "こおりのきば",
//   "10まんボルト"
// ];

// const val = {};
// const num = [];
// for (let i = 0; i < 10000; i++) {
//   const rand = Math.floor(Math.random() * arr.length);
//   if (val[arr[rand]] === undefined) {
//     val[arr[rand]] = num.length;
//     num.push(1);
//   } else {
//     num[val[arr[rand]]] += 1;
//   }

//   const data = { val: { ...val }, num: [...num] };
//   const result = { waza: data };
//   hash[i] = result;
// }

// // console.log(2, hash[2], 100, hash[100]);

// const compareNum = (a,b) =>{
//   for(let i=0;i<a.length;i++){
//     b[i] -= a[i]
//   }

//   return b
// }

// const rank = (min,max) =>{
//   const arr = compareNum(min["waza"]["num"],max["waza"]["num"]);
//   for(let key in max["waza"]["val"]){
//     // console.log(key)
//     max["waza"]["val"][key] = arr[max["waza"]["val"][key]];
//     // console.log(key,max["waza"]["val"][key]);
//   }


//   return max;
// }

// console.log(rank(hash[2], hash[100])["waza"]);
