class AuthController < ApplicationController

    def create
        token = request.headers["Authorization"]
        # Remember decoded JWT comes back as array [{payload},{alg}], so use [0] to get payload, then key name to get value
        user_id = JWT.decode(token, "secret")[0]["user_id"]
        user = User.find(user_id)
        render json: {user: user.name}
    end

end