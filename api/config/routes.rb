Rails.application.routes.draw do
  get 'articles/index'
  get 'articles/edit'
  get 'articles/show'
  post 'articles/create'
  get 'users/index'
  post 'users/create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
