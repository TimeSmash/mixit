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

    def most_marked(quality)
        most_marked_drinks = []
        drink_and_count_arr = [] #[{drink=>drink_obj, count=>FMI count number}]
        Drink.all.each do |drink|
            # First go through all drinks
          counter = 0
          drink.user_drinks.each do |user_drink|
            # Then go through all that drink's user_drinks
              if user_drink[quality] === true
                  counter += 1
              end
          end
          # puts drink.name + " was " + quality + " " + counter.to_s + " times" 
          drink_and_count_arr.push({"drink" => drink, "count" => counter})
          
        end
        # return drink_and_count_arr
        # Use map to just get counts of each drink, then sort and take last three (highest counts)
        three_highest_counts = drink_and_count_arr.map{|obj| obj["count"]}.sort.slice(drink_and_count_arr.length-3,drink_and_count_arr.length-1)
        # If the three highest counts are the same, three or more drinks tied for first
        if three_highest_counts.uniq.length === 1
            # All counts tied
            # So, set most_marked_drinks to the drinks with this count, then randomize and take 3
            most_marked_drinks = drink_and_count_arr.select do |obj| 
                obj["count"] === three_highest_counts.uniq[0]
            end.shuffle().slice(0,3)
        else 
            # Only one or two drinks have first place
          tier_1_ranked_drinks = drink_and_count_arr.select do |obj|
            obj["count"] === three_highest_counts.last 
          end
            # byebug
          if tier_1_ranked_drinks.length === 2
            # 2 drinks tied for first place, set 1st and second place (no need to shuffle)
            most_marked_drinks[0] = tier_1_ranked_drinks[0]
            most_marked_drinks[1] = tier_1_ranked_drinks[1]
            #In case 2+ drinks tied for second place, pick random one for index-2 of most_marked
            second_place = drink_and_count_arr.select do |ele|
                    ele["count"] === three_highest_counts[0] 
            end.shuffle().first
            most_marked_drinks[2] = second_place
          elsif tier_1_ranked_drinks.length === 1 
                # There is an official first place, only 1 drink has first place
                most_marked_drinks[0] = tier_1_ranked_drinks[0]
                # Check for ties in second place
                if three_highest_counts[0] === three_highest_counts[1] 
                    # 2+ drinks tied for second place, pick random ones for index-1 and index-2 of most_marked
                    second_and_third_place = drink_and_count_arr.select{|obj| obj["count"] === three_highest_counts[1]}.shuffle().slice(0,2)
                    most_marked_drinks[1] = second_and_third_place[0]
                    most_marked_drinks[2] = second_and_third_place[1]    
                else 
                    # 2nd and 3rd place are different
                    # Take 2nd place (index-1) of three_highest_count 
                    # byebug
                    # most_marked_drinks[1] = three_highest_counts[1]
                    # Could use find here instead
                    second_place = drink_and_count_arr.select do |obj|
                        obj["count"] === three_highest_counts[1] 
                    end.first
                    most_marked_drinks[1] = second_place
                    #In case 2+ drinks tied for third place, pick random one for index-2 of most_marked
                    third_place = drink_and_count_arr.select do |obj|
                        obj["count"] === three_highest_counts[0] 
                    end.shuffle().first
                    most_marked_drinks[2] = third_place
                end
            end
        end
        # [{d=><#>, count => #}{}{}]
        return most_marked_drinks
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
        # Seearch user's drinks for particular mark (Fave,made,int)
         user.user_drinks.select do |u_drink|
            u_drink["#{quality}"] === true
        end.map do |fave_user_drink|
            # Return array to convert UserDrink obj into Drink obj
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

    # Keep track of how many times F M I
    def amount_of_drinks_marked(quality) 
        UserDrink.all.select do |ud|
            ud[quality] === true
        end.length
    end

    def most_recently(quality)
        UserDrink.select do |u_d|
            u_d[quality] === true
        end.sort_by{|marked_drink| marked_drink.updated_at}.last.drink
    end

    def most_recents
        render json: {most_recently_favorited: most_recently("favorited"),
            most_recently_made: most_recently("made"),
            most_recently_interested: most_recently("interested")
        }
    end

    # def stats
    #     render json: {
    #         total_favorited_drinks: amount_of_drinks_marked("favorited")
    #         total_made_drinks: amount_of_drinks_marked("made")
    #         total_interested_drinks: amount_of_drinks_marked("interested")
    #     }
    # end


   

end

def capitalized_name(name)
    prepositions = %w(with and or de but of)
    capital = name.split(" ").map do |word| 
        if prepositions.include?(word)
            word
        else
            word.capitalize
        end
    end.join(" ")
    return capital
end

def search_for_drink_with_exact_name(name)
    # Do NOT capitalize words like and, or, de, with, etc.
    name_to_search_for = capitalized_name(name)
    return Drink.find_by(name: name_to_search_for)
    # Returns nil if nothing
end

def drinks_containing_name(name, drink_name_arr)
    # Go thru all drink names, return the ones that have name included
    inc_drink_names = drink_name_arr.filter{|drink_name| drink_name.include?(name)}
    # From there, capitalize the filtered list
    drink_names_capitalized = inc_drink_names.map{|idn| capitalized_name(idn)}
    # Then find Drinks whose names are in capitalized filtered list
    if drink_names_capitalized.length === 0
        return nil
    else
        return drink_names_capitalized.map{|dnc| Drink.find_by(name: dnc)}
    end
end

def search_by_name(name)
    name.downcase!
    search_results = []
    lowercase_drink_names = Drink.all.map{|d| d.name.downcase}.sort
    names_a_thru_m = lowercase_drink_names.select{|name| name.match(/^[a-m]/)}
    names_n_thru_z = lowercase_drink_names.select{|name| name.match(/^[n-z]/)} 
    
    if search_for_drink_with_exact_name(name)
        search_results[0] = search_for_drink_with_exact_name(name)
    end
    # Take first letter of name, see what part of array has drinks beginning with that letter
    # Then look thru array that has drinks beginning with that letter
    if name.match(/^[a-m]/)
        # Name begins with a-m, now look at name and see if included in Drink names
        if drinks_containing_name(name, names_a_thru_m)
            # See if the name is included in the string anywhere, if it is get Drink objs with name put in search results
            drinks_containing_name(name, names_a_thru_m).each{|drink_obj| search_results.push(drink_obj)}
        end
    elsif name.match(/^[n-z]/)
        if drinks_containing_name(name, names_a_thru_m)
            drinks_containing_name(name, names_n_thru_z).each{|drink_obj| search_results.push(drink_obj)}
        end
    else 
        return render json: {nothing_found_message: "We couldn't find anything with the name #{name}. Please try again."} 
    end
    return search_results.compact.uniq
end

end

