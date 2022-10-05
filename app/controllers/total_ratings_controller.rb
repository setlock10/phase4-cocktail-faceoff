class TotalRatingsController < ApplicationController
    skip_before_action :authorize, only: :update


    # def create
    #     # byebug
    #     render json: TotalRating.create!(total_params), status: :created
    # end
    def update
        # byebug
        total_rating=TotalRating.first
        total_params={total:1+total_rating.total}
        # byebug
        total_rating.update!(total_params)
        render json: total_rating.total, status: :ok
    end

    private

    def total_params
        params.permit(:total)
    end

    
end

