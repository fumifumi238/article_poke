# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

300.times do |n|
  user = User.create(name: "app_#{n}", twitter: "twitter_#{n}")
  article = Article.create(url:"https://abcdefg#{n}.com",user: user,rate:2000+n,season:1,series:1,rank:1+n,title:"最強#{n}")
  6.times do |i|
    party = Party.create(pokemon: Faker::Games::Pokemon.name,item: "アイテム#{i}",ability:"とくせい#{n}",terastal:"ノーマル#{i}",nature:"おだやか#{i}",article: article)
    4.times do |j|
      move = Move.create(pokemon: party.pokemon,name: Faker::Games::Pokemon.move,season:1,series:1,rank:1+n,article: article)
    end
  end
end
