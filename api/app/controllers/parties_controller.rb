class PartiesController < ApplicationController
  def pokemon_per_article
     @parties = Party.select("parties.id,parties.pokemon,parties.item,parties.article_id")

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
end
