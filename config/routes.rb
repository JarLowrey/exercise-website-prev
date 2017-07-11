# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  resources :events
  get "/events/:id/*other" => "events#show" #if any txt is trailing id, also send this route to events#show
  
  #alias the "events" routes
  resources :e, controller: 'events'
  get "/e/:id/*other" => "events#show" #if any txt is trailing id, also send this route to events#show

  devise_for :users
  root to: "pages#index"
  get ":page" => "pages#show" 
end
