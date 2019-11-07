Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destory'
  resources :users
  resources :drinks
  get '/classy_drinks', to: 'drinks#classy_drinks'
  get '/see_secret', to: 'drinks#see_secret'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/retrieve_user', to: 'auth#retrieve_user'
  # get '/drinks', to: 'drinks#index'    /drinks(.:format) 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
