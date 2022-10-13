Rails.application.routes.draw do
  resources :user_drink_ratings, only:[ :create]
  resources :sessions, only:[:create, :destroy]
  resources :users, only:[:create, :show]
  resources :total_ratings, only:[:show, :update]
  resources :drinks, only:[:show,:update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'

  #  get '/random1', to: 'drinks#random1'
   get '/random2', to: 'drinks#index'
   post '/signup', to: 'users#create'
   get '/me', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   patch '/hasdrink',to: 'user_drink_ratings#hasdrink'
   get '/globalrank', to: 'drinks#globalrank'
   #get '/userrank'
   


  get '*path',  to: 'fallback#index',  constraints: ->(req) { !req.xhr? && req.format.html? }

end
