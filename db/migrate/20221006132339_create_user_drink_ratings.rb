class CreateUserDrinkRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :user_drink_ratings do |t|
      t.integer :drink_id
      t.integer :user_id
      t.integer :rating

      t.timestamps
    end
  end
end
