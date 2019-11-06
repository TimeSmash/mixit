class DrinksController < ApplicationController

    def index
        @drinks = Drink.all
        serialized_data = DrinkSerializer.new(@drinks).serialized_json
        render json: serialized_data
        # Returned in the format of {data: [{id: #, type: "drink", attributes: {name: "Kir", alcohols: [],...} }, {}]
    end
    
    def show
        @drink = Drink.find(params[:id])
        serialized_data = DrinkSerializer.new(@drink).serialized_json
        render json: serialized_data
        # Returned in the format of {data: {id: #, type: "drink", attributes: {name: "Kir", alcohols: [],...} }
    end
    
    def see_secret
        # This isn't necessary for any app functioning, but it does work
        # An exercise in secret keys, fetch requests, and render
        @secret = ENV["MIXIT_SECRET"]
        render plain: @secret
    end

    def similar_drinks
        # To do that, take info from Drink card somehow and send to backend
        drink_to_compare = "SOMETHING SENT TO BACKEND" #ex. <h1 id="name">.innerText and send to back
        # # This works if finding a drink by name and seeing if any drinks have same alcohol
        # Drink.select do |drink|
        #     drink.alcohols.any? do |alcohol|
        #         Drink.find_by(name: "Martini").alcohols.include?(alcohol)
        #     end
        # end


        # This is the best
        # 1. Filter drinks that have one of drink_to_compare's alcohols (ex. Martini has gin, so does G and T)
        #    Now array of all drinks that have a similar alcohol in common with d_to_c
        # 2. Filter new array for drinks that have one of d_to_c's flavors (Martini = "bitter", G+T ="bitter" && "gin")
        #    Now array of all drinks with a type AND flavor in common
        # 3. Filter new array for drinks with similar types to d_to_c  (Martini = "classic", G+T = "classic")
        #    Now array is drinks that have
        #    >=1 alcohol that d_to_c has, 
        #    >=1 flavor that d_to_c has, 
        #    >=1 type that d_to_c has.
        # 4. This still will include original drink, so find it and filter it out
             
        # REPLACE MARTINI CRAP with drink_to_compare
        @similar_drinks = Drink.select do |drink|
            drink.alcohols.any? do |alcohol|
                Drink.find_by(name:"Martini").alcohols.include?(alcohol) && drink.name != "Martini"
            end
        end.select do |drink2|
            drink2.flavors.any? do |flavor|
                Drink.find_by(name:"Martini").flavors.include?(flavor)
            end
        end.select do |drink3|
            drink3.types.any? do |type|
              Drink.find_by(name:"Martini").types.include?(type)
            end
        end
        render json: @similar_drinks
    end

    def drinks_with_same_alc
        # Same FIRST alcohol

        drink_to_compare = "SOMETHING FROM FRONTEND"
        
        Drink.select do |drink|
            # Go thru all drinks, for one drink, go thru all its alcohols
            # If any match d_to_c's alcs && are NOT d_to_c, (true) get those drinks
            drink.alcohols.include?(drink_to_compare.alcohols[0]) && drink.name != drink_to_compare.name
            # Afterwards, randomize the array and take the first five elements
        end.shuffle.slice(0..4)
    end

    def classy_drinks
        @classy_drinks = Drink.select do |drink|
          drink.types.include?("Classy")
        end.shuffle.slice(0..4)
        render json: @classy_drinks
    end

    def drinks_with_same_flav
        drink_to_compare = "SOMETHING FROM FRONTEND"
        
        Drink.select do |drink|
            # Go thru all drinks, for one drink, go thru all its flavors
            # If any match d_to_c's flavs && are NOT d_to_c, (true) get those drinks
            drink.flavors.include?(drink_to_compare.flavors[0]) && drink.name != drink_to_compare.name
            # Afterwards, randomize the array and take the first five drinks
        end.shuffle.slice(0..4)
    end

    def drinks_with_same_type
        drink_to_compare = Drink.find_by(name: "SOMETHING FROM FRONTEND")
        
        Drink.select do |drink|
            # Go thru all drinks, for one drink, go thru all its types
            # If any match d_to_c's types && are NOT d_to_c, (true) get those drinks
            drink.types.include?(drink_to_compare.types[0]) && drink.name != drink_to_compare.name
            # Afterwards, randomize the array and take the first five drinks
        end.shuffle.slice(0..4)
    end

    def show_random_drink
        @random_drink = Drink.find( rand((Drink.first.id)..(Drink.last.id)) )

        render json: @random_drink

    end

    # route = post 'search_by_name/:name', to: 'drinks#search_by_name'
    def search_by_name
        @drinks_including_name = Drink.select do |drink|
            drink.name.downcase.include?(params[:name].downcase)
        end
        render json: @drinks_including_name
    end

    # route = post 'search_by_alcohol/:alcohol', to: 'drinks#search_by_alcohol'
    # def search_by_alcohol
    #     @drinks_including_alcohol = Drink.select do |drink|
    #         # look thru all drinks
                # Have logic where if one param not included we don't all freak out
    #         # drink.alcohols.select.include?(params[:alcohol])
    #     end
    #         # look thru all alcohols of that drink
    # end

end
