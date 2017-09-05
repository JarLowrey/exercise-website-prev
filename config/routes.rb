# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do  

  resources :exercises do
    collection do
      get :search_for_named
    end
  end

  resources :events do
    member do
      put :add_or_rm_role
    end
    collection do
      get :search
    end
  end
  get "/events/:id/*other" => "events#show" #if any txt is trailing id, send this route to events#show
  
  #alias the "events" routes
  match '/e/*other',
    via: :all, 
    to: redirect { |path_params, req|
      #We are matching /e from an absolute path. Thus, the first occurrence of '/e' is the one we want to substitute for '/events'. Sub the first and return
      req.original_url.sub('/e','/events')
    }

  resources :users, only: [:show]    
  devise_for :users, controllers: { 
    sessions: 'users/sessions', 
    registrations: "users/registrations", 
    confirmations: "users/confirmations", 
    #omniauth_callbacks: "user/omniauth_callbacks", 
    passwords: "user/passwords", 
    unlocks: "user/unlocks" 
  }
  
  
  root to: "pages#index"
  get ":page" => "pages#show" 
end
