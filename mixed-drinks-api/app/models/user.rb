class User < ApplicationRecord
    has_secure_password(options = {validations:false})

    has_many :user_drinks
    has_many :drinks, through: :user_drinks

    # VALIDATIONS

    #Use :allow_blank to prevent error messages from stacking
    #ex. If Username not entered, no point in showing min/max errors, just say they should enter it
    
    validates :password, presence: {message: "%{attribute} was not entered"}
    #Using % here sticks the name of the value being validated in the message
    validates :name, :email, :birthday, presence: { message: "%{attribute} was not entered" }
        
    validates :name, uniqueness: {message: "This username has already been taken."} 
    validates :name, length: {minimum: 3, too_short: "Your username must be at least 3 characters long."}, :allow_blank => true
    validates :name, length: {maximum: 30, too_long: "Your username cannot be more than 30 characters long."}, :allow_blank => true
    
    validates :password, length: {minimum: 3, too_short: "Your password must be at least 3 characters long."}, :allow_blank => true
    


    validates :email, uniqueness: true, :allow_blank => true
    validates_format_of :email, :with=>/\b[A-Z0-9._%=-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, message: "Email entered was not a valid email.", :allow_blank => true
end
