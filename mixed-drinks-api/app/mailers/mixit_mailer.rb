class MixitMailer < ApplicationMailer
    default from: "from@mixit.com"

    def sample_email(user)
        @user = user
        mail(to: @user.email, subject: 'Sample Email')
    end
end
