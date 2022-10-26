class UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
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
