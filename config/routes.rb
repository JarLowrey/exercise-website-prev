# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  resources :events do
    member do
      put :add_participant_to #current_user is set to be the participant of @event
      put :remove_participant_from #current_user is removed from event participation
    end
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
