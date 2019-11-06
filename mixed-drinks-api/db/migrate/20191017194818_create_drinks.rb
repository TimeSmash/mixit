class CreateDrinks < ActiveRecord::Migration[5.2]
  def change
    create_table :drinks do |t|
      t.string :name
      t.string :alcohols 
      t.string :flavors 
      t.string :types 
      t.string :color 
      t.string :picture_url
      t.string :picture_credit
      t.string :recipe
      t.string :recipe_url
      t.string :additional_notes

      t.timestamps
    end
  end
end
