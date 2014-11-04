Rails.application.routes.draw do
  get "usuario/:id", to: "users#index"
  put "usuario/:id/favoritos/:articulo_id", to: "users#add_favorite"
  get "usuario/:id/articulos_favoritos", to: "users#favorite_articles"
end
