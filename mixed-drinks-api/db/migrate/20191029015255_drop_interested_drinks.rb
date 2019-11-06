class DropInterestedDrinks < ActiveRecord::Migration[5.2]
  def change
    drop_table :interested_drinks
  end
end
