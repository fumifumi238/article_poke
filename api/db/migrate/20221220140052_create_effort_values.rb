class CreateEffortValues < ActiveRecord::Migration[6.0]
  def change
    create_table :effort_values do |t|
      t.integer :h,default:0,null: false
      t.integer :a,default:0,null: false
      t.integer :b,default:0,null: false
      t.integer :c,default:0,null: false
      t.integer :d,default:0,null: false
      t.integer :s,default:0,null: false
      t.integer :sum,default:0,null: false
      t.references :party, null: false, foreign_key: true

      t.timestamps
    end
  end
end
