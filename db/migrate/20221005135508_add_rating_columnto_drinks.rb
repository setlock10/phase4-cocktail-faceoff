class AddRatingColumntoDrinks < ActiveRecord::Migration[7.0]
  def change
    remove_column :drinks, :rating
    add_column :drinks, :rating, :integer, :default => 1500
    #Ex:- :default =>''
  end
end
