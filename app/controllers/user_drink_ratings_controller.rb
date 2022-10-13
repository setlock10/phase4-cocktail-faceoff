class UserDrinkRatingsController < ApplicationController
    skip_before_action :authorize, only: [:hasdrink]

    def hasdrink
        # byebug
        udr=UserDrinkRating.find_by(find_params)
        #byebug
        # if(udr)
        render json: udr, status: :ok

    end

    def userrank

        render json: UserDrinkRating.all.sort_by{|userr| -userr.rating}.pluck( :drink_id, :rating), status: :ok

    end

    def create

        #byebug

        #test=UserDrinkRating.create_or_update
        if (UserDrinkRating.find_by(update_params)==nil)
            #byebug
            item=UserDrinkRating.create!(update_params)
            render json: item, status: :ok
        else
            #byebug
            item=UserDrinkRating.update!(update_params)
            render json: item, status: :accepted
        end
      



    end


    private

    def find_params
        params.permit(:user_id, :drink_id)
    end

    def update_params
        params.permit(:user_id, :drink_id, :rating)
    end

end
