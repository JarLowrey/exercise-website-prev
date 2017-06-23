class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|

    end

    create_table :group_types do |t|
      t.string :name, null: false
      t.boolean :verified, null: false
    end
  end
end
