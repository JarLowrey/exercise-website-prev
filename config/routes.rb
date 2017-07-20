# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do
  resources :events do
    member do
      #add/remove participants
      put :add_curr_usr_as_participant_to 
      put :remove_curr_usr_as_participant_from 

      #add/remove organizers
      put :add_curr_usr_as_organizer_to 
      put :remove_curr_usr_as_organizer_from 

      #add/remove coaches
      put :add_curr_usr_as_coach_to 
      put :remove_curr_usr_as_coach_from 
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
