class DrinksController < ApplicationController
    skip_before_action :authorize, only: :index

    def show
        # byebug
        render json: Drink.find(params[:id]), status: :ok
    end

    
    def index
        two_drinks=[]
        drink1=Drink.all.sample
        two_drinks<<drink1
        # byebug

        drink2=Drink.all.sample 
        while (drink1.id==drink2.id) do
            drink2=Drink.all.sample
        end

        two_drinks<<drink2


        render json: two_drinks, status: :ok
    end

    

end
