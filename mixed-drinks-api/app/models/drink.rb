class Drink < ApplicationRecord
    serialize :alcohols, Array
    serialize :flavors, Array
    serialize :types, Array

    has_many :user_drinks
    has_many :users, through: :user_drinks

end

# A drink can be favorited by many users
# A user can favorite mutiple drinks
# The list a user has of all their favorited drinks could be known as FavoriteDrinks