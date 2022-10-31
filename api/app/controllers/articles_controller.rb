class ArticlesController < ApplicationController
  def index
    @articles = Article.eager_load(:user).select("articles.*, users.*").where(series: params[:series])
    @limit_articles = @articles.limit(30).offset(params[:offset])
    @moves = Move.where(article: @articles.ids).select('pokemon,name,count(name) as count').group(:pokemon,:name)
    @parties = Party.where(article: @articles.ids)
    @pokemon_ranks = @parties.select('pokemon,count(pokemon) as count').group(:pokemon).order('Count(pokemon) DESC')

    @terastals =  @parties.select('pokemon,terastal,count(terastal) as count').group(:pokemon,:terastal).order('pokemon,Count(terastal) DESC')
    @items = @parties.select('pokemon,item,count(item) as count').group(:pokemon,:item).order('pokemon,Count(item) DESC')
    @abilities = @parties.select('pokemon,ability,count(ability) as count').group(:pokemon,:ability).order('pokemon,Count(ability) DESC')
    @natures = @parties.select('pokemon,nature,count(nature) as count').group(:pokemon,:nature).order('pokemon,Count(nature) DESC')

    render json: {articles:@limit_articles,pokemon_ranks:@pokemon_ranks ,items:@items,abilities: @abilities,terastals:@terastals,natures:@natures,moves:@moves}
  end

  def edit
  end

  def show
  end

  def create
    @user = User.find_or_initialize_by(name: params[:name],twitter: params[:twitter])
    @articles = Article.new(article_params)
    @articles.user = @user

    if @articles.save
      if @user.new_record?
        user.save
      end
      render json: { status: 200, message: "成功しました。"}
    else
      render json: { status: 500, message: "予期せぬエラーが発生しました。" }
    end
  end



private
  def article_params
    params.permit(:url,:rate,:rank,:season,:series)
  end
end
