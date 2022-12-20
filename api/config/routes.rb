Rails.application.routes.draw do
  get 'articles/index'
  get 'articles/rank'
  get 'articles/utilization_rate'
  get 'articles/edit'
  get 'articles/show'
  get 'articles/get_exist_url'
  get "articles/search_pokemon"
  post 'articles/create'

  get 'users/index'
  get "users/:id", to: "users#show"
  post 'users/create'

  get 'parties/pokemon_per_article'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
