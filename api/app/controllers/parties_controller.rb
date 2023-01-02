class PartiesController < ApplicationController

  # どの記事にどのポケモンがいるかを配列で返す。[ピカチュウ]:[1,3,8]
  def pokemon_per_article
     @parties = Party.where(article_id: params[:ids]).select("parties.id,parties.pokemon,parties.item,parties.article_id")


     hash = {}
     @parties.each do |party|
      if hash[party.pokemon] == nil
        hash[party.pokemon] = []
        hash[party.pokemon] << party.article_id
      else
        hash[party.pokemon] << party.article_id
      end

     end

     render json: hash
  end

  def get_party_by_article_id
    @parties = Party.where(article_id: params[:id])
    data = get_party_with_stats(@parties)

    render json: data;
  end

private
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


end
