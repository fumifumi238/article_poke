class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :url,null: false
      t.integer :rate
      t.integer :rank
      t.integer :season,null: false
      t.integer :series,null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
