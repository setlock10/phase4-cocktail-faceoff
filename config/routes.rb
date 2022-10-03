Rails.application.routes.draw do
  resources :total_ratings, only:[:show, :update]
  resources :drinks, only:[:show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # get '/hello', to: 'application#hello_world'

  get '/random1/', to: 'drinks#random1'
  get '/random2/', to: 'drinks#random2'

  
end
