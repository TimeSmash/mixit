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
            most_marked_drinks= make_obj_into_array_of_objs(highest_drink_obj).shuffle().slice(0,3)
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
            # else 
            #     # Don't need this?
            #     most_marked_drinks = tier_1_ranked_drinks.shuffle().slice(0,3)
            end
        end
        return most_marked_drinks
end

# # WITH COMMENTS
# def most_marked(quality)
#     # The whole point of this thing is to return the three highest marked drinks in array of objs
#     #   drink_counts = []
#   drink_and_count = {}
#   most_marked_drinks = []
  
#   Drink.all.each do |drink|
#     counter = 0
#     # Could also use select instead of each here and get resulting array's length...
#     drink.user_drinks.each do |user_drink|
#         if user_drink["favorited"] === true
#             counter += 1
#         end
#    end
#     # puts drink.name + " was " + quality + " " + counter.to_s + " times"
#     drink_and_count[drink.name] = counter # ex. G&T with 3 faves = {G&T=>3, ..., ...} 
#     # drink_counts.push(counter)
#   end
#     # puts drink_and_count {"Kir"=>0, "Kir Royale"=>0,...}


#     # last 3 of drink_and_count.values to get highest 3 counts by using .last(3) or equiv below via slice
#     three_highest_counts = drink_and_count.values.sort.slice(drink_and_count.values-3,drink_and_count.values-1)
#     # [64,77,77]
    
#     # most_marked_drinks should hold the drinks (as objs) with highest counts
#     # ex. It could end up looking like ["G&T"=>77}, "Aperol Spritz"=>77}, "French Martini"=>64}]
    
    
#     if three_highest_counts.uniq.length === 1
#     #     # if the three highest scores are all equal...
#     # Then at least three drinks all have the same count
#     # Then just find the drinks that have this count, randomly take three and set them as marked drinks
    
#     # EXPLAINATION PURPOSE ONLY
#     # most_marked_drinks = drink_and_count.select do |drink, count| 
#     #   count === three_highest_counts.uniq[0] # This gives you a giant obj {G&T=>77,Aperol Spritz=>77,...} so turn into array
#     # end.map do |k,v|
#     # {k=>v} end #Now you have array of objs [{}{}{}]
    
    
#     # In actual code, use this:
#     highest_drink_obj = drink_and_count.select do |drink, count| 
#     count === three_highest_counts.uniq[0] 
#     end

#     most_marked_drinks= make_obj_into_array_of_objs(highest_drink_obj).shuffle().slice(0,3)
    
#     return most_marked_drinks
    
#     # If the scores differ, then...
#     # This means that either 2 drinks share the highest count, or only one has the highest count
#     # If 2 drinks have the same count and are one of the three highest counts, then make it so
#     # both those drinks are in the highest counts array
#   else  
#    tier_1_ranked_drinks = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
#     # Get all drinks that have the highest counts 
#     # ex. G&T has 77 likes, so does Aperol Spritz, French Martini has 64
#     # Therefore the three_highest_counts should be 64,77,77
    
#     # Find all the drinks in drink_and_counts whose count is 77
#     count === three_highest_counts.last #Gives you {G&T=>77,Aperol Spritz=>77}  so make into array
#   end) # Ends up as [{G&T=>77},{}] in our example

#   # Depending on the length of that array, do one of the following
  
#   if tier_1_ranked_drinks.length === 1 
#     # Ideally, only one drink will have the highest amount of F/M/I
#     # If there's only 1 drink that has the highest count, set it as the 1st item in most_marked_drinks
#     most_marked_drinks[0] = tier_1_ranked_drinks[0]
#     # 1st (highest) drink set.
    
#     # Then we need to account for second and third drinks...
    
#     # Compare the counts left in three highest counts (2nd and 3rd place)
#     if three_highest_counts[0] === three_highest_counts[1] 
#         # If the two remaining counts are the same...
#         # A tie for second place
#         # Ex. if three_highest_counts were [64,64,77]
#         # Then at least 2 drink have this same count (ex. could have 2n,3rd,4th place all with counts of 64)
#         # Find Drinks with that count, randomly set one as most_marked 2nd place and one as most_marked 3rd place
#         second_and_third_place = make_obj_into_array_of_objs(drink_and_count.select {|k,v| v === three_highest_counts[1]}).shuffle().slice(0,2)
#         most_marked_drinks[1] = second_and_third_place[0]
#         most_marked_drinks[2] = second_and_third_place[1]
#         # return most_marked_drinks
#     else 
#         # If the two remaining counts are different...
#         # Ex. if three_highest_counts were [60,64,77]
#         # Then we can set most_marked_drinks second place
#         most_marked_drinks[1] = tier_1_ranked_drinks[1]
#         # We still need to set third drink and account for ties on this level
#         # Could have multiple scores of 60, but not seen(ex. could have 3rd,4th,5th... place all with counts of 60)
#         # Find Drinks with that count, randomly set one as most_marked 3rd place 
#         third_place = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
#             count === three_highest_counts[0] #Gives you {k=>v, k=>v...}  so make into array
#         end).shuffle().first
#         most_marked_drinks[2] = third_place
#         # return most_marked_drinks
#         end
#   elsif tier_1_ranked_drinks.length === 2
#     # If there's 2 drinks that has the highest count, this means two drinks are tied for highest count
#     # Set one as the first in marked_drinks, then one as the second in marked_drinks
#     most_marked_drinks[0] = tier_1_ranked_drinks[0]
#     most_marked_drinks[1] = tier_1_ranked_drinks[1]
#     # But then you need to account for third drink...
#         # The third drink in three_highest_drinks when 1st place is a tie means the remaining drink is in 2nd place
#         # Therefore, it should the the first drink in three_highest_drinks [64,77,77]
#         # As usual, many other drinks could also have a count of 64, so let's make an object for those drinks and turn it into array
#         # From that array, shuffle it and pick one of the drinks to set as second place
        
#         second_place = make_obj_into_array_of_objs(drink_and_count.select do |drink, count|
#             count === three_highest_counts[0] #Gives you {k=>v, k=>v...}  so make into array
#         end).shuffle().first

#         most_marked_drinks[2] = second_place
#         # tier_2_ranked_drinks = three_highest_counts[three_highest_counts.length-2]
#   else #tier1 is 3 or more, but you shouldn't be hitting this, see the uniq part
#     # Three or more drinks in tier_1 means many drinks tied for the highest count
#     # In that case, randomly take three from the tied drinks and set it as most_marked_drinks
#     most_marked_drinks = tier_1_ranked_drinks.shuffle().slice(0,3)
#     return most_marked_drinks
#   end
# byebug

# end
# end