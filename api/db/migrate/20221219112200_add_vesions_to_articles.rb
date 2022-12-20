class AddVesionsToArticles < ActiveRecord::Migration[6.0]
  def up
    add_column :articles, :version, :string, :default => 'sv'
    add_column :articles, :format, :string, :default => 'single'
  end

  def down

  end
end
