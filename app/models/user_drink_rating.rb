class UserDrinkRating < ApplicationRecord
    belongs_to :user
    belongs_to :drink
end
