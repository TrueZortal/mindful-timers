Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#show"
  get 'personal', to: 'pages#personalview'
  resources :timers
end
