class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def edit
  end

  def show
  end

  def create
    @articles = Article.new(article_params)
    @user = User.find_or_create_by(name: params[:user][:name],twitter: params[:user][:twitter])
    @articles.user = @user

    if @articles.save
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
