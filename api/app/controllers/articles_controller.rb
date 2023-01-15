class ArticlesController < ApplicationController
  def index
    seasons = ""
    if params[:seasons] != nil
      puts "not nil"
      (params[:seasons]).each do |season|
       seasons += season + ","
      end
    end
    values = {
      "season IN(?) ": seasons,
      "format = ? ": params[:format],
      "permit = ? ": 1,
      "articles.rank >= ? ": params[:ranks][0],
      "articles.rank <= ? ": params[:ranks][1],
    }
    #  rank = [params[:rank][0],params[:rank][1]]
    #  season: params[:seasons],format: params[:format],version: params[:version],rank: params[:ranks][0]..params[:ranks][1],permit: true

    search = add_query(values)
    @all_articles = Article.joins(:user)
    .select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter")
    .where(search).order('articles.season DESC,articles.rank ASC')

    @articles = @all_articles.limit(20)

    @ids = @all_articles.ids

    @parties = Party.select("terastal,pokemon,item,article_id").where(article: @articles.ids).eager_load(:article).order("pokemon ASC").group_by{|party| party.article_id}

    article_with_party = get_articles_with_party(@articles,@parties)

    render json:[article_with_party,@ids]
  end

  def load
    @articles = Article.joins(:user)
    .select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter")
    .where(id: params[:ids]).order('articles.season DESC,articles.rank ASC')

    @parties = Party.select("terastal,pokemon,item,article_id").where(article: @articles.ids).eager_load(:article).order("pokemon ASC").group_by{|party| party.article_id}

    render json: get_articles_with_party(@articles,@parties)

  end

  def rank
    #  @articles = Article.joins(:user).select("articles.url,articles.rate,articles.rank,articles.title,articles.season,users.name as user_name,users.twitter").where(season: params[:seasons])
     @parties = Party.where(article: params[:ids])
     @pokemon_ranks = @parties.select('pokemon,count(pokemon) as count').group(:pokemon).order('Count(pokemon) DESC')

     render json: @pokemon_ranks
  end

  def search_pokemon
    @articles = Article.joins(:user).select("articles.id as id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter").where(id: params[:ids]).order('articles.season DESC,articles.rank ASC').limit(20)
    @parties = Party.select("terastal,pokemon,item,article_id").where(article: @articles.ids).eager_load(:article).order("pokemon ASC").group_by{|party| party.article_id}

    render json: get_articles_with_party(@articles,@parties);
  end


  # すでに登録されているURL
  def get_exist_url
    @urls = Article.pluck(:url)

    render json: @urls

  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    render status: 200;
  end

  def permit_article
    article = Article.find(params[:id])
    article.update(permit: true)

    render status: 200
  end

  def not_permit_articles
    @articles = Article.where(permit: false);


    arr = []
    @articles.each do |article|
      @user = User.find(article.user_id)
      @parties = Party.where(article: article)

      b = []

      @parties.each do |party|
        moves = Move.select(:id,:name,:party_id).where(party: party)
        effortValues = EffortValue.where(party: party).pluck(:h,:a,:b,:c,:d,:s,:sum)
        individualValues = IndividualValue.where(party: party).pluck(:h,:a,:b,:c,:d,:s)

        c = {pokemon: party,moves: moves,effortValues: effortValues[0],individualValues: individualValues[0]}
        b.push(c)

      end

      hash = {article: article,user: @user,party: b}
      arr.push(hash)

    end

    render json: arr

  end

  def get_article_by_rental
    @article = Article.joins(:user).select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter").find_by(rental: params[:rental])
    if @article == nil

      render json: []
      return;
    end

    @party = Party.where(article: @article).select(:terastal,:pokemon,:item,:article_id).order("pokemon ASC").group_by{|party| party.article_id}

    hash = {
              id: @article.id,
              url: @article.url,
              rate: @article.rate,
              rank: @article.rank,
              season: @article.season,
              title: @article.title,
              rental: @article.rental,
              tn: @article.tn,
              twitter: @article.twitter,
              party: @party[@article.id]
    }

     render json: [hash];
  end



  # 使用率
  def utilization_rate
    @articles = Article.where(id: params[:ids]).pluck("articles.id")
    @parties = Party.where(article: @articles,pokemon: params[:pokemon])

    @natures = @parties.select('nature as name,count(nature) as count').group(:nature).order('Count(nature) DESC')
    @items = @parties.select('item as name,count(item) as count').group(:item).order('Count(item) DESC')
    @terastals =  @parties.select('terastal as name,count(terastal) as count').group(:terastal).order('Count(terastal) DESC')
    @abilities = @parties.select('ability as name,count(ability) as count').group(:ability).order('Count(ability) DESC')
    @moves = Move.select('name,count(name) as count').where(party: @parties.ids).group(:name).order('Count(name) DESC')

    render json: {natures:@natures,items:@items,terastals:@terastals,abilities:@abilities,moves:@moves}
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
      i= party[:individualValues]
      e = party[:effortValues]

      new_individual_values = IndividualValue.create!(h: i[0],a:i[1],b:i[2],c:i[3],d:i[4],s:i[5],party: new_party)
      new_effort_values = EffortValue.create!(h: e[0],a:e[1],b:e[2],c:e[3],d:e[4],s:e[5],sum: e[6],party: new_party)


    end
  end



end
