class User < ApplicationRecord
    has_secure_password

    has_many :user_drinks
    has_many :drinks, through: :user_drinks

    # VALIDTATIONS
    validates :name, :email, :birthday, presence: true
        
    validates :name, uniqueness: true 
    validates :name, length: {minimum: 3, too_short: "Your username must be at least 3 characters long."}
    validates :name, length: {maximum: 30, too_long: "Your username cannot be more than 30 characters long."}
    
    validates :email, uniqueness: true
end
