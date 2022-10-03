class UsersController < ApplicationController
    def create
        user=user.create!(user_params)
        session[:user_id]=user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, status: :ok
    end


    private
    def user_params
        params.permit(:username, :password)
    end
end
