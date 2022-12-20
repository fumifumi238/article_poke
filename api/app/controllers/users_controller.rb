class UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  def show
    @user = User.find_by(twitter: params[:id])
     @articles = Article.joins(:user).select("articles.id,articles.url,articles.rate,articles.rank,articles.title,articles.season,articles.rental,users.name as tn,users.twitter")
    .where(user_id: @user).order(season: :desc)

    @parties = Party.where(article: @articles.ids).select(:terastal,:pokemon,:item,:article_id).group_by{|party| party.article}

    render json: get_articles_with_party(@articles,@parties);
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { status: 200, message: "成功しました。"}
    else
      render json: { status: 500, message: "予期せぬエラーが発生しました。" }
    end
  end


 private

  def user_params
    params.permit(:name,:twitter)
  end

end
