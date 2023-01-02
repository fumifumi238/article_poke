class AddRentalToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :rental, :string,:default => ''
  end
end
