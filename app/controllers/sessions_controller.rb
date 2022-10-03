class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        user =User.find_by(username: params[:username])
        if user&.authenicate(params[:password]) 
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {error:["Invalid password or username"]}, status: :unauthorized
        end
    end


    def destroy
        session.destroy :user_id
        head :no_content
    end
end
