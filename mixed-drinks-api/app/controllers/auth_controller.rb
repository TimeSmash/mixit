class AuthController < ApplicationController
    # Auth methods are used to KEEP a user logged in or logged out???

    # This is used when user is logged in, and to maintain their logged-in state.
    # Receives token, and gets user from that user_id after token decoded
    def retrieve_user
        token = request.headers["Authorization"] #JSON sent over has Authriz : token sent over, get token
        # Remember original JWT encoded token has payload of user_id 
        # Remember decoded JWT comes back as array [{payload},{alg}], so use [0] to get payload, then key name to get value
        user_id = JWT.decode(token, ENV["MIXIT_SECRET"], true, {algorithm: 'HS384'})[0]["user_id"]
        # Now we have  user_id we can use, let's find the user
        user = User.find(user_id)
        render json: {user: user.name}
    end
    # Use byebug before user_id=   to see token


end