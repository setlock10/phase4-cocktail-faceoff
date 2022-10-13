class Drink < ApplicationRecord
    has_many :user_drink_ratings
    has_many :users, through: :user_drink_ratings
end
