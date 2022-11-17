Rails.application.routes.draw do
  get 'articles/index'
  get 'articles/rank'
  get 'articles/detail'
  get 'articles/edit'
  get 'articles/show'
  get 'articles/get_urls'
  post 'articles/create'
  get 'users/index'
  post 'users/create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
