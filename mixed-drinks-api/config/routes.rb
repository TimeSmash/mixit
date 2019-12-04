Rails.application.routes.draw do
  # go from most specific to most general
  get 'sessions/destory'
  resources :users
  resources :drinks
  
  get '/all_drinks_paginated/:page', to: 'drinks#paginated_drinks'
  get '/all_drinks', to: 'drinks#index'
  get '/random_drink', to: 'drinks#show_random_drink'
  get '/get_id_ranges', to: 'drinks#get_id_ranges'
  get '/get_drink_and_suggestions/:id', to: 'drinks#get_drink_and_suggestions'
  get '/return_drink_arrays/:id', to: 'drinks#return_drink_arrays'
  get '/similar_drinks/:id', to: 'drinks#return_drink_arrays'
  get '/classy_drinks', to: 'drinks#classy_drinks'
  get '/favorited_toggle/:id', to: 'user_drinks#favorited_toggle'
  get '/made_toggle/:id', to: 'user_drinks#made_toggle'
  get '/interested_toggle/:id', to: 'user_drinks#interested_toggle'
  get '/marked_drinks/', to: 'user_drinks#marked_drinks'
  get '/stats', to: 'dashboard#stats'
  get 'top_drinks', to: 'user_drinks#get_top_drinks_from_each_quality'
  get '/drinks_with_same_flav/:id', to: 'drinks#drinks_with_same_flav'
  get '/see_secret', to: 'drinks#see_secret'

  get '/get_user_drink',  to: 'user_drinks#get_user_drink'

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'

  get '/retrieve_user', to: 'auth#retrieve_user'
  # get '/drinks', to: 'drinks#index'    /drinks(.:format) 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
