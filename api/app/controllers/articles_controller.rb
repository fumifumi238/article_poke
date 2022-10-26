class ArticlesController < ApplicationController
  def index
    @articles = Article.joins(:user).select("articles.*, users.*")
    render json: @articles
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
