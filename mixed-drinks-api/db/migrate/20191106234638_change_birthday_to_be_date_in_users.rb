class ChangeBirthdayToBeDateInUsers < ActiveRecord::Migration[5.2]

  def up
    # up descirbes what to do when running rails db:migrate
    # In this scenario, we ran into the error column "birthday" cannot be cast automatically to type date
    # We use a USING statement to bypass this
    change_column :users, :birthday, :date, using: 'birthday::date'
  end

  def down
    # down describes what to do when running rails db:rollback
    change_column :users, :birthday, :string
  end

end
