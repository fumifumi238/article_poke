class CreateIndividualValues < ActiveRecord::Migration[6.0]
  def change
    create_table :individual_values do |t|
      t.integer :h,default:31,null: false
      t.integer :a,default:31,null: false
      t.integer :b,default:31,null: false
      t.integer :c,default:31,null: false
      t.integer :d,default:31,null: false
      t.integer :s,default:31,null: false
      t.references :party, null: false, foreign_key: true

      t.timestamps
    end
  end
end
