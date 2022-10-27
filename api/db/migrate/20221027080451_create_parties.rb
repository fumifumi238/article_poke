class CreateParties < ActiveRecord::Migration[6.0]
  def change
    create_table :parties do |t|
      t.string :pokemon,null:false
      t.string :item,default: 'なし'
      t.string :ability,null:false
      t.string :terastal
      t.string :nature,null:false
      t.references :article, null: false, foreign_key: true
      t.timestamps
    end
  end
end
