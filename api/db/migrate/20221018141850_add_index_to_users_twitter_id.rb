class AddIndexToUsersTwitterId < ActiveRecord::Migration[6.0]
  def change
    add_index :users,:twitter_id,unique: true
  end
end
