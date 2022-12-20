class ArticlesController < ApplicationController
  def index
    @articles = Article.joins(:user).select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter")
    .where(season: params[:seasons],format: params[:format],version: params[:version]).order(:rank,season: :desc).limit(30).offset(params[:offset])

    @parties = Party.where(article: @articles.ids).select(:terastal,:pokemon,:item,:article_id).group_by{|party| party.article}

    render json: get_articles_with_party(@articles,@parties);
  end

  def rank
     @articles = Article.joins(:user).select("articles.url,articles.rate,articles.rank,articles.title,articles.season,users.name as user_name,users.twitter").where(season: params[:seasons])
     @parties = Party.where(article: @articles.ids)
     @pokemon_ranks = @parties.select('pokemon,count(pokemon) as count').group(:pokemon).order('Count(pokemon) DESC')

     render json: @pokemon_ranks
  end

  def search_pokemon
    puts params[:ids]
    @articles = Article.joins(:user).select("articles.id as id,articles.url,articles.rate,articles.rank,articles.title,articles.season,users.name as tn,users.twitter").where(id: params[:ids]).limit(30)
    @parties = Party.where(article: @articles.ids).select(:terastal,:pokemon,:item,:article_id).group_by{|party| party.article}

    render json: get_articles_with_party(@articles,@parties);
  end


  # すでに登録されているURL
  def get_exist_url
    @urls = Article.pluck(:url)

    render json: @urls

  end



  # 使用率
  def utilization_rate
    @articles = Article.where("articles.rank >= ? and articles.rank <= ? and articles.season = ?",1,10000,1).pluck("articles.id")
    @parties = Party.where(article: @articles,pokemon: params[:pokemon])

    @natures = @parties.select('nature as name,count(nature) as count').group(:nature).order('Count(nature) DESC')
    @items = @parties.select('item as name,count(item) as count').group(:item).order('Count(item) DESC')
    @terastals =  @parties.select('terastal as name,count(terastal) as count').group(:terastal).order('Count(terastal) DESC')
    @abilities = @parties.select('ability as name,count(ability) as count').group(:ability).order('Count(ability) DESC')
    @moves = Move.select('name,count(name) as count').where(party: @parties.ids).group(:name).order('Count(name) DESC')

    render json: {natures:@natures,items:@items,terastals:@terastals,abilities:@abilities,moves:@moves}
  end

  def edit
  end

  def show
  end

  def create
    @user = User.find_or_initialize_by(user_params)
    @article = Article.new(article_params)
    @article.user = @user

    if @article.save
      if @user.new_record?
        user.save
      end
      save_pokemon_details(params[:parties],@article)
      render json: { status: 200, message: "成功しました。"}
    else
      render json: { status: 500, message: "予期せぬエラーが発生しました。" }
    end
  end



private
  def article_params
    params.permit(:url,:title,:rate,:rank,:season,:series,:rental,:version,:format)
  end

  def party_params
    params.permit(:pokemon,:item,:terastal,:ability,:nature)
  end

  def user_params
    params.permit(:name,:twitter)
  end

  def save_pokemon_details(parties,article)
    parties.each do |party|
      party_params = party.permit(:pokemon,:ability,:item,:nature,:terastal)
      puts party_params
      new_party = Party.new(party_params)
      new_party.article = article
      new_party.save

      party[:moves].each do |move|
        if move != "" || move != nil
          move = Move.new(pokemon: new_party.pokemon,name: move)
          move.party = new_party
          move.save
        end
      end
    end
  end



end
