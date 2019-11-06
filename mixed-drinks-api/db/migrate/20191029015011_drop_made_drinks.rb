class DropMadeDrinks < ActiveRecord::Migration[5.2]
  def change
    drop_table :made_drinks
  end
end
