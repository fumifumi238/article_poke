# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


tera = ["ノーマル","いわ","むし","ゴースト","みず","はがね","あく","くさ","ほのお","あく","ドラゴン","でんき","じめん","エスパー","こおり","かくとう","フェアリー"]
ab = ["もうか","しんりょく","げきりゅう"]
moves = ["かみなり","じしん","りゅうせいぐん","ねむる","まもる"]

item = ["こだわりスカーフ","こだわりメガネ","こだわりハチマキ","きあいのタスキ"]
nature = ["いじっぱり","おくびょう","ようき"]
pokemons = ["サーフゴー","ドドゲザン","ニンフィア","ドラパルト"]

(1..100).each do |n|
  user = User.new(name: "スカーレット_#{n}", twitter: "twitter_#{n}")
  article = Article.create!(url:"https://abcdefg#{n}.com",user: user,rate:2000-n,season:1,series:1,rank:n,title:"【S11 最終2002 296位】純度92まきびしゲコミミマンダ【シングル6→3】#{n}",permit: true)
  6.times do |i|
    party = Party.create!(pokemon: pokemons.sample,item: item.sample ,ability: ab.sample,terastal: tera.sample,nature: nature.sample,article: article)
    4.times do |j|
      move = Move.create!(pokemon: party.pokemon,name: moves[j],party: party)
    end
    effort_value = EffortValue.new(h:rand(0...31),a:rand(0..31),b:rand(0..31),c:rand(0..31),d:rand(0..31),s:rand(0..31),party: party)
    effort_value.sum = effort_value.h+effort_value.a+effort_value.b+effort_value.c + effort_value.d + effort_value.s
    effort_value.save
    individual_value = IndividualValue.create!(h:rand(0..31),a:rand(0..31),b:rand(0..31),c:rand(0..31),d:rand(0..31),s:rand(0..31),party: party)
  end
  user.save
end
