class Dashboard
    attr_reader :user_count, :drink_count
    def initialize()
        @user_count = User.all.length
        @drink_count = Drink.all.length 
     end
end
