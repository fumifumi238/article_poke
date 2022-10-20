class RenameTwitterColumnToUsers < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :twitter_id, :twitter
  end
end
