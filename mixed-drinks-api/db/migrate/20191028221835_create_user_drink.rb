class CreateUserDrink < ActiveRecord::Migration[5.2]
  def change
    create_table :user_drinks do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :drink, foreign_key: true
      t.boolean :favorited
      t.boolean :made
      t.boolean :interested
      t.boolean :reviewed
      t.string :review_content
      t.integer :review_stars
    end
  end
end
