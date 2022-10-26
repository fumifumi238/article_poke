class AddTitleToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :title, :string,null: false
  end
end
