class User < ApplicationRecord
    has_many :user_drink_ratings
    has_many :drinks, through: :user_drink_ratings

    has_secure_password
    validates :username, presence: true, uniqueness: true
    
end
