class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.decimal :cost, precision: 8, scale: 2, null: false
      t.string  :name, null: false
      t.text  :description, null: false

      t.integer :min_users
      t.integer :max_users

      #timing
      t.datetime :start_time
      t.string :recurring

      t.timestamps
    end

    create_table :event_reviews do |t|
      t.belongs_to :user
      t.belongs_to :event
      
      t.integer :rating, null: false
      t.text :comment

      t.timestamps
    end
  end
end
