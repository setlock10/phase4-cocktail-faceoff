class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show]
 

    def create
        # byebug
        user=User.create!(user_params)
        session[:user_id]=user.id
        render json: user, status: :created
    end

    def show
       # byebug
        
        current_user = User.find_by(id: session[:user_id])
        #byebug
        render json: current_user, status: :ok
    end

    

    private
    def user_params
        params.permit(:username, :password)
    end

    


end
