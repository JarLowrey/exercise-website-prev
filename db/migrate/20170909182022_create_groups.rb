class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|

      t.string :name, null: false
      t.boolean :verified, null: false
      t.string :logo
      
      t.timestamps
    end
  end
end
