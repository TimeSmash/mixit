class Drink < ApplicationRecord
    serialize :alcohols, Array
    serialize :flavors, Array
    serialize :types, Array

    has_many :user_drinks
    has_many :users, through: :user_drinks

    self.per_page = 14

    # Using will_paginate tells Rails that we have "pages" for out database
    # This means that each page has a certain number of items on it (self.per_page = 10)
    # We can inform Rails how many pages there are, as well as what page we are currently on
    # Depending on the current page, Rails will only return a portion of the dataase
    # This is much faster than trying to retrieve the whole database at once
    # Use paginate() to tell Rails the current page, ex. Drink.paginate(:page => 1)
    # We can send over the page number from a fetch request
    # For example, if user clicks page "2", take that front frontend (button.innerText or something)
    # Then, 10 Drinks will be sent back that correspond with page 2

    # Remember front-end needs to know how many pages database has
    # Otherwise, if you did it manually there is room for error
    # Front-end also needs to know current page in Rails backend because it needs to have page button bar be in sync
    # ex. on page 7 will get Drinks associated with page 7 but UI won't have page 7 highlighted

    # See Drinks_controller for how that is modeled specifically.
    # We send over the drinks for that page, the current page, and total_pages to front end


end

# A drink can be favorited by many users
# A user can favorite mutiple drinks
# The list a user has of all their favorited drinks could be known as FavoriteDrinks