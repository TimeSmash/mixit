class SessionsController < ApplicationController
  
  

  def create #LOGIN path 
      # See if user exists by searching by name
      user = User.find_by(:name => params[:name])
      # If they do exist, see that their password matches as well
      # Comparing both password_digests via authenticate
      if (user && user.authenticate(params[:password]))
          # make a token to pass to front end with encrypted user id
          token = JWT.encode({ user_id: user.id }, ENV["MIXIT_SECRET"], 'HS384')
          # This crap can be used for App.setState
          render json: { user: user.name, jwt: token }
      else
          render json: {invalid_message: "Invalid username/password combination. Please try again."}
      end
  end

  def destroy
    return "HI"
  end
end
