class AddPermitToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :permit, :boolean,:default => false
  end
end
