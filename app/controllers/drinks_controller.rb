class DrinksController < ApplicationController
    def show
        # byebug
        render json: Drink.find(params[:id]), status: :ok
    end

    def random1
        # byebug
        render json: Drink.all.sample, status: :ok
    end
    
    def random2
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
