class CreateMoves < ActiveRecord::Migration[6.0]
  def change
    create_table :moves do |t|
      t.string :pokemon,null: false
      t.string :name,null:false
      t.references :party, null: false, foreign_key: true

      t.timestamps
    end
  end
end
