class AddTimestampsToUserDrinks < ActiveRecord::Migration[5.2]
  # Forgot to add timestamps to UserDrinks
  # We COULD try to do add_column like so: add_column :user_drinks, :created_at, :datetime, null: false
  # But that gives an error because we created data without timestamps before
  # This is because when we add these columns to exisiting data, they will be null by default and we want them to NOT be null ever
  
  # Since we want the table's created/updated times to never be null, we can add the columns and let them be null temporarily and assign them a default value, THEN alter their ability to be null. Since they are now all filled in, no issue!
  # Instead, we can add them with add_timestamps
  # We first add the timestamps but allow them to be empty/null
  # Then we make up some fake time they were created/updated (like Dec 1st)
  # Now we can update every UserDrink's created/updated with this time
  # Atfer than we make future entries unable to be null 
  def change
    add_timestamps :user_drinks, null: true 
    dec_first_2019 = DateTime.new(2019, 12, 1)
    UserDrink.update_all(created_at: dec_first_2019, updated_at: dec_first_2019)

    change_column_null :user_drinks, :created_at, false
    change_column_null :user_drinks, :updated_at, false
  end
end
