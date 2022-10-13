class DrinksController < ApplicationController
    skip_before_action :authorize, only: [:index, :update, :globalrank]
   

    def show
        # byebug
        render json: Drink.find(params[:id]), status: :ok
    end

    def update
        render json:  Drink.find(params[:id]).update!(drink_params), status: :accepted
    end

    def globalrank
        render json: Drink.all.sort_by{|drink| -drink.rating}.pluck(:strDrink, :rating), status: :ok

    end

    
    def index
        two_drinks=[]
        drink1=Drink.all.sample
        # drink1=Drink.first
        two_drinks<<drink1
        # byebug

        drink2=Drink.all.sample 
        while (drink1.id==drink2.id) do
            drink2=Drink.all.sample
        end
        two_drinks<<drink2
        render json: two_drinks, status: :ok
    end

    private
        def drink_params
            params.permit(:rating)

        end

    

end
