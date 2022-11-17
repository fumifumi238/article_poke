class ArticlesController < ApplicationController
  def index
    @articles = Article.joins(:user).select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,users.name as user_name,users.twitter").where(series: params[:series])

    render json: @articles
  end

  def rank
     @articles = Article.joins(:user).select("articles.url,articles.rate,articles.rank,articles.title,articles.season,users.name as user_name,users.twitter").where(series: 1)
     @parties = Party.where(article: @articles.ids)
     @pokemon_ranks = @parties.select('pokemon,count(pokemon) as count').group(:pokemon).order('Count(pokemon) DESC')

     render json: @pokemon_ranks
  end


  def get_urls
    @urls = Article.pluck(:url)

    render json: @urls

  end



  def detail
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
