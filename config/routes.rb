Rails.application.routes.draw do
  resources :sessions
  resources :users
  resources :total_ratings, only:[:show, :update]
  resources :drinks, only:[:show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'

  get '/random1', to: 'drinks#random1'
  get '/random2', to: 'drinks#random2'
  # post '/signup', to: 'users#create'
  # get '/me', to: 'users#show'
  # post '/login', to: 'sessions#create'
  # delete '/logout', to: 'sessions#destroy'

  get '*path',  to: 'fallback#index',  constraints: ->(req) { !req.xhr? && req.format.html? }

end
