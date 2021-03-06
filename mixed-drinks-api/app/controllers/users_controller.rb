class UsersController < ApplicationController
    
    
    def create
        # remember creating a user is essentially signing up
        # byebug
        @user = User.create(user_params)
        if @user.invalid? 
            render json: {error_messages: @user.errors.messages}
        else 

            token = JWT.encode({user_id: @user.id}, ENV["MIXIT_SECRET"], 'HS384')
            render json: {token: token, user: @user.name}
        end
    end
    
    def update
    
    end
    
    def show
        @user = User.find(params[:id])
        render json: @user
    end
    
    def destroy
    
    end

    def favorite_drinks
        @user = User.find(params[:id])
        render json: @user.user_drinks.where(favorited === true)
    end

    def made_drinks
        @user = User.find(params[:id])
        render json: @user.user_drinks.where(made === true)
    end

    def interested_drinks
        @user = User.find(params[:id])
        render json: @user.user_drinks.where(interested === true)
    end

    def reviewed_drinks
        @user = User.find(params[:id])
        render json: @user.user_drinks.where(reviewed === true)
    end

    private
    def user_params
        params.require(:user).permit(:name, :password, :email, :birthday)
    end

    
end
