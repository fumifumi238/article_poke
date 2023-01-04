class ApplicationController < ActionController::API

    def get_party_with_stats(parties)
    arr = []
    parties.each do |party|
      moves = Move.where(party: party).pluck(:name)
      effort_values = EffortValue.where(party: party).pluck(:h,:a,:b,:c,:d,:s,:sum)
      individual_values = IndividualValue.where(party: party).pluck(:h,:a,:b,:c,:d,:s)
      data = {
        id: party.id,
        pokemon: party.pokemon,
        item: party.item,
        nature: party.nature,
        ability: party.ability,
        terastal: party.terastal,
        moves: moves,
        effortValues: effort_values[0],
        individualValues: individual_values[0],
      }
      arr.push(data)
    end
    arr
  end

  def get_articles_with_party(articles,parties)
    arr = []
    articles.each do |article|
      party = parties[article]
      value = {id: article.id,
              url: article.url,
              rate: article.rate,
              rank: article.rank,
              season: article.season,
              title: article.title,
              rental: article.rental,
              tn: article.tn,
              twitter: article.twitter,
              party: party}
      arr.push(value)
    end
    arr
   end
end
