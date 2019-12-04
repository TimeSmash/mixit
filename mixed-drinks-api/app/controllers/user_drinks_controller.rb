class UserDrinksController < ApplicationController

    def index
    
    end
    
    def create
    
    end

    # WIP of DRYer way of getting user_id and drink_id
    # def get_user_id_from_token(token)
    #     @user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]
    #     return @user_id
    # end

    def get_user_drink
        token = request.headers["Authorization"]
        
        user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]

        drink_id = request.headers["Drink-Id"]

        @user_drink = UserDrink.find_by(user_id: user_id, drink_id: drink_id) #not found => nil

        if @user_drink 
            render json: @user_drink
        else
            # user drink doesn't exist
            render json: {does_not_exist: "User Drink does not exist."} 
        end
    end

  def make_obj_into_array_of_objs(obj)
   array_of_objs = obj.map do |k,v|
       {k=>v}
   end
   return array_of_objs
  end  

def most_marked(quality)
      drink_and_count = {}
      most_marked_drinks = []
      Drink.all.each do |drink|
        counter = 0
        drink.user_drinks.each do |user_drink|
            if user_drink[quality] === true
                counter += 1
            end
        end
        # puts drink.name + " was " + quality + " " + counter.to_s + " times"
        drink_and_count[drink.name] = counter 
      end
      
        three_highest_counts = drink_and_count.values.sort.slice(drink_and_count.values.length-3,drink_and_count.values.length-1)
        if three_highest_counts.uniq.length === 1
            highest_drink_obj = drink_and_count.select do |drink, count| 
            count === three_highest_counts.uniq[0] 
            end
            # most_marked_drinks= make_obj_into_array_of_objs(highest_drink_obj).shuffle().slice(0,3) #[G&T=>7]
            
            
            # {"Aperol Spritz"=>4, "Kir Royale"=>3, "Alexander"=>2}
            


            most_marked_drinks = Drink.all.select do |drink| 
                highest_drink_obj.keys.include?(drink.name)
            end
        else 
            tier_1_ranked_drinks = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
            count === three_highest_counts.last 
            end) 
            # byebug
            if tier_1_ranked_drinks.length === 1 
                # There is an official first place
                most_marked_drinks[0] = tier_1_ranked_drinks[0]
                if three_highest_counts[0] === three_highest_counts[1] 
                    # 2+ drinks tied for second place, pick random ones for index-1 and index-2 of most_marked
                    second_and_third_place = make_obj_into_array_of_objs(drink_and_count.select {|k,v| v === three_highest_counts[1]}).shuffle().slice(0,2)
                    most_marked_drinks[1] = second_and_third_place[0]
                    most_marked_drinks[2] = second_and_third_place[1]    
                else 
                    # 2nd and 3rd place are different
                    # Take 2nd place (index-1) of three_highest_count and set is as most_marked[1]
                    # byebug
                    # most_marked_drinks[1] = three_highest_counts[1]
                    second_place = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
                        count === three_highest_counts[1] 
                    end).shuffle().first
                    most_marked_drinks[1] = second_place
                    #In case 2+ drinks tied for third place, pick random one for index-2 of most_marked
                    third_place = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
                        count === three_highest_counts[0] 
                    end).shuffle().first
                    most_marked_drinks[2] = third_place
                end
            elsif tier_1_ranked_drinks.length === 2
                # 2 drinks tied for first place, set 1st and second place (no need to shuffle)
                most_marked_drinks[0] = tier_1_ranked_drinks[0]
                most_marked_drinks[1] = tier_1_ranked_drinks[1]
                #In case 2+ drinks tied for second place, pick random one for index-2 of most_marked
                second_place = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
                        count === three_highest_counts[0] 
                    end).shuffle().first
                    most_marked_drinks[2] = second_place
            end
        end
        # [{d=>#}{}{}]

        most_marked_drinks_obj = {}

        most_marked_drinks.each do |ele|
            most_marked_drinks_obj[ele.keys[0]] = ele.values[0]
        end

        # names = most_marked_drinks.map{|drink_obj| drink_obj.keys[0]}
        names = most_marked_drinks_obj.keys

        drink_objs = names.map{|name| Drink.find_by_name(name)}
        
        drink_objs_and_counts = {}

        drink_objs.each do |drink|
           drink_objs_and_counts[drink.name.split(" ").join("")+"Obj"] = {:drink => drink, :count=>most_marked_drinks_obj[drink.name]}
        end
        # return most_marked_drinks
        return drink_objs_and_counts
end

def get_top_drinks_from_each_quality
    render json:{ 
        top_favorited: most_marked("favorited"),
        top_made: most_marked("made"),
        top_interested: most_marked("interested")
    }
end

    def destroy_if_all_false(user_drink)
        # If all ways of interacting with user_drink are false, it should be 
        # deleted from UserDrinks entirely since the User uses those ways to 
        # have some connection with a Drink
        if user_drink.favorited === false && drink.made === false && drink.interested === false && drink.reviewed === false
            UserDrink.destroy(user_drink)
        end
    end
    
    def already_exists?(user_drink)
        # return the boolean of a specificed user_drink, this fxn is used to appear more semantic
        # Is the drink already an exisiting object in UserDrinks?
        # The result of UserDrink.find/find_by will always be the user_drink arg (#<> or nil)
        return !!user_drink
    end

    
# TOGGLES CAN BE MADE DRIER
    def favorited_toggle
        # 1. get token
        # byebug
        token = request.headers["Authorization"]
        # 2. Decode token to get user info, specifically the id
        user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]
        # 3. Using the user_id and the drink_id, see if a userDrink already exists in UserDrink.all
        @user_drink = UserDrink.find_by(user_id: user_id, drink_id: params[:id]) #not found => nil
        #
        # If drink exists in UserDrinks already, and is NOT favorited already, then favorite it
        if already_exists?(@user_drink) && @user_drink.favorited != true
            @user_drink.update(favorited: true)
        elsif already_exists?(@user_drink) && @user_drink.favorited === true
            # If @user_drink is in UserDrinks, but is ALREADY favorited, unfavorite it
            @user_drink.update(favorited: false)
        else
            # If drink doesn't exist in UserDrinks, then make a new entry and mark as favorited
            @user_drink = UserDrink.create(
                user_id: user_id,
                drink_id: params[:id],
                favorited: true
            )
        end
        # Finally, render the favorited state of the drink
        render json: @user_drink
    end
    
    def made_toggle
        # 1. get token
        # byebug
        token = request.headers["Authorization"]
        # 2. Decode token to get user info, specifically the id
        user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]
        # 3. Using the user_id and the drink_id, see if a userDrink already exists in UserDrink.all
        @user_drink = UserDrink.find_by(user_id: user_id, drink_id: params[:id]) #not found => nil
        #
        # If drink exists in UserDrinks already, and is NOT made already, then favorite it
        if already_exists?(@user_drink) && @user_drink.made != true
            @user_drink.update(made: true)
        elsif already_exists?(@user_drink) && @user_drink.made === true
            # If @user_drink is in UserDrinks, but is ALREADY made, unfavorite it
            @user_drink.update(made: false)
        else
            # If drink doesn't exist in UserDrinks, then make a new entry and mark as made
            @user_drink = UserDrink.create(
                user_id: user_id,
                drink_id: params[:id],
                made: true
            )
        end
        # Finally, render the made state of the drink
        render json: @user_drink
    end

    def interested_toggle
        # 1. get token
        # byebug
        token = request.headers["Authorization"]
        # 2. Decode token to get user info, specifically the id
        user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]
        # 3. Using the user_id and the drink_id, see if a userDrink already exists in UserDrink.all
        @user_drink = UserDrink.find_by(user_id: user_id, drink_id: params[:id]) #not found => nil
        #
        # If drink exists in UserDrinks already, and is NOT interested already, then favorite it
        if already_exists?(@user_drink) && @user_drink.interested != true
            @user_drink.update(interested: true)
        elsif already_exists?(@user_drink) && @user_drink.interested === true
            # If @user_drink is in UserDrinks, but is ALREADY interested, unfavorite it
            @user_drink.update(interested: false)
        else
            # If drink doesn't exist in UserDrinks, then make a new entry and mark as interested
            @user_drink = UserDrink.create(
                user_id: user_id,
                drink_id: params[:id],
                interested: true
            )
        end
        # Finally, render the interested state of the drink
        render json: @user_drink
    end
    
    def get_drinks_from_quality(user, quality)
         user.user_drinks.select do |u_drink|
            u_drink["#{quality}"] === true
        end.map do |fave_user_drink|
            Drink.find(fave_user_drink.drink_id)
        end
    end

    def marked_drinks
        # marked meaning favorited, made, and interested
        # Get the token
        token = request.headers["Authorization"]
        # Get the user id from the token
        user = User.find(JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"])
        
        # The actual Drink objects will be returned below
        

        render json: {favorited_drinks: get_drinks_from_quality(user, "favorited"),
        made_drinks: get_drinks_from_quality(user, "made"),
        interested_drinks: get_drinks_from_quality(user, "interested")}
    end

    def create_review
        user_drink = UserDrink.find_by(user_id: FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        # If drink exists in UserDrinks already, and is NOT flagged as reviewed, then flag it as reviewed
        # Ex favorited G+T (making it exist), but didn't leave review
        if already_exists?(user_drink) && user_drink.reviewed != true
            user_drink.update(
                reviewed: true,
                review_content: PARAMS,
                review_stars: PARAMS
            )
        elsif already_exists?(user_drink) && user_drink.reviewed === true
            return null
        else
            # If drink doesn't exist in UserDrinks, make a new UserDrink object
            UserDrink.create(
                user_id: FROM_FRONTEND,
                drink_id: ALSO_FROM_FRONTEND,
                reviewed: true,
                review_content: PARAMS,
                review_stars: PARAMS
            )
        end
    end

    def edit_review
        # Remember this can only be selected once review is made, no need to check if user_drink exists
        user_drink = UserDrink.find_by(user_id: PARAMS_FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        user_drink.update(review_content: PARAMS, review_stars: PARAMS)
    end

    def delete_review
        user_drink = UserDrink.find_by(user_id: PARAMS_FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        user_drink.update(reviewed: false, review_content: "", review_stars: 0)
        destroy_if_all_false(user_drink)
    end


    # CONSIDER DELETING THIS CRAP

    # def unflag_favorited
    #     user_drink = UserDrink.find_by(user_id: PARAMS_FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
    #     user_drink.update(favorited: false)
    #     destroy_if_all_false(user_drink)
    # end

    def flag_as_made
        user_drink = UserDrink.find_by(user_id: FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        # If drink exists in UserDrinks already, and is NOT flagged as made already, then flag it as made
        if already_exists?(user_drink) && user_drink.made != true
            user_drink.update(made: true)
        elsif already_exists?(user_drink) && user_drink.made === true
            # If drink exists, but is already favorited, don't do anything
            # This shouldn't even be an issue the way this is being set up, but stil
            return null
        else
            # If drink doesn't exist in UserDrinks
            UserDrink.create(
                user_id: FROM_FRONTEND,
                drink_id: ALSO_FROM_FRONTEND,
                made: true
            )
        end
    end

    def unflag_made
        user_drink = UserDrink.find_by(user_id: PARAMS_FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        user_drink.update(made: false)
        destroy_if_all_false(user_drink)
    end

    def flag_as_interested
        user_drink = UserDrink.find_by(user_id: FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        # If drink exists in UserDrinks already, and is NOT flagged as interested, then flag it as interested
        if already_exists?(user_drink) && user_drink.interested != true
            user_drink.update(interested: true)
        elsif already_exists?(user_drink) && user_drink.interested === true
            return null
        else
            # If drink doesn't exist in UserDrinks
            UserDrink.create(
                user_id: FROM_FRONTEND,
                drink_id: ALSO_FROM_FRONTEND,
                interested: true
            )
        end
    end

    def unflag_interested
        user_drink = UserDrink.find_by(user_id: PARAMS_FROM_FRONTEND, drink_id: ALSO_FROM_FRONTEND)
        user_drink.update(interested: false)
        destroy_if_all_false(user_drink)
    end

    def amount_of_drinks_marked(quality)
        UserDrink.all.select do |ud|
            ud[quality] === true
        end.length
    end

    def drink_that_is_most(quality)
    # Find the drink that is most F M or I
    # To do that go thru all Drinks
    # Then look at that Drink's user_drinks
    # For every user_drink that Drink has that is marked, increase a counter by 1
    end

    # def stats
    #     render json: {
    #         total_favorited_drinks: amount_of_drinks_marked("favorited")
    #         total_made_drinks: amount_of_drinks_marked("made")
    #         total_interested_drinks: amount_of_drinks_marked("interested")
    #     }
    # end


   

end