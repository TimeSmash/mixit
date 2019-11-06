class DropFavoritedDrinks < ActiveRecord::Migration[5.2]
  def change
    drop_table :favorite_drinks
  end
end
