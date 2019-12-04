class DashboardController < ApplicationController
    def stats
        @dashboard = Dashboard.new
        render json: @dashboard
    end
end