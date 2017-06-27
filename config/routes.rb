Rails.application.routes.draw do
  resources :events
  resources :activities
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#index"
  get ":page" => "pages#show" 
end
