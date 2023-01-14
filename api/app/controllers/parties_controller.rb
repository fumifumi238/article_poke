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
    @parties = Party.where(article_id: params[:id]).order("pokemon ASC")
    data = get_party_with_stats(@parties)

    render json: data;
  end

  def search_pokemon_and_item
    values = {
      "pokemon = ? ": params[:pokemon],
      "item = ? ": params[:item]
    }
    if  !need_params([params[:pokemon]])
      render json:[],status: 404
      return;
    end

    search = add_query(values)
    @lists = Party.joins(:article).where(search).references(:article).select(:id,:pokemon,:nature,:item)
    @individual_values = IndividualValue.where(party: @lists.ids).pluck(:h,:a,:b,:c,:d,:s)
    @effort_values = EffortValue.where(party: @lists.ids).pluck(:h,:a,:b,:c,:d,:s,:sum)
    render json:[@lists,@individual_values,@effort_values]
  end

private




end
