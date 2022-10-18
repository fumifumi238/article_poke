class UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  def new
    @user = User.new
  end

end
