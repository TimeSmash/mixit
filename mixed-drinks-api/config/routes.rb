Rails.application.routes.draw do
  resources :users
  resources :drinks
  get '/classy_drinks', to: 'drinks#classy_drinks'
  get '/see_secret', to: 'drinks#see_secret'
  # get '/drinks', to: 'drinks#index'    /drinks(.:format) 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
