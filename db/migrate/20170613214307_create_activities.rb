class CreateActivities < ActiveRecord::Migration[5.1]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.decimal :cost, precision: 8, scale: 3, null: false
      t.string :instructions

      t.datetime :start, null: false
      t.datetime :end, null: false

      t.timestamps
    end
  end
end
