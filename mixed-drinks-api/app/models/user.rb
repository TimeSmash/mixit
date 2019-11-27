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
    
    validate :at_least_21

def at_least_21
    # look at self.birthday to see if inputted, and if it is...
    if self.birthday
        # Add an error message if the inputted birthday is greater than today 21 years ago
        # The way this works is that dates are measured from year 0
        # So 21_years_ago can be seen as a number, ex. 934829839909 minutes
        # The user's birthday is also measured from year 0
        # Therefore, their birthday in minutes must be 934829839909 or LESS
        # Anything greater than that number indiciates that the person was born after 21_years_ago
        # ex. 19 years old
        # if 0-21_years ago is 934829839909 minutes, then 0-19 years old is somthing like 1034829839909 minutes
        # 1034829839909 minutes (19) > 934829839909 minutes (21) => 19 year old's minutes > 21 year old's minutes --> add error message
      errors.add(:birthday, 'You must be 21 years or older to sign up for Mixit.') if self.birthday > 21.years.ago.to_date
    end
end

    validates :email, uniqueness: true, :allow_blank => true
    validates_format_of :email, :with=>/\b[A-Z0-9._%=-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, message: "Email entered was not a valid email.", :allow_blank => true
end
