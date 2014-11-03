Rails.application.routes.draw do
  get "usuario/:id", to: "users#index"
end
