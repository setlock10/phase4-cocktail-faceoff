class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authorize

    private

    def authorize
        @current_user ||=User.find_by(id: session[:user_id])
        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless @current_user
    end

    
    def authenticated_user

        render json: {errors: ["Not Logged In"]}, status: :unauthorized unless @current_user
    end


    # def hello_world
    #     session[:count] = (session[:count] || 0) + 1
    #     render json: { count: session[:count] }
    # end
        
end
