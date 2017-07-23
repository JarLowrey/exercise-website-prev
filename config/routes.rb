# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  resources :events
  namespace :events do
      put "/:id/add_or_rm_role" => "participants#add_or_rm_role"
  end
  get "/events/:id/*other" => "events#show" #if any txt is trailing id, also send this route to events#show
  
  #alias the "events" routes
  match '/e/*other',
    via: :all, 
    to: redirect { |path_params, req|
      #We are matching /e from an absolute path. Thus, the first occurrence of '/e' is the one we want to substitute for '/events'. Sub the first and return
      req.original_url.sub('/e','/events')
    }


  devise_for :users
  
  root to: "pages#index"
  get ":page" => "pages#show" 
end
