class CreateTotalRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :total_ratings do |t|
      t.integer :total

      t.timestamps
    end
  end
end
