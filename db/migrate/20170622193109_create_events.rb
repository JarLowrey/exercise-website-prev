class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events, id:false do |t|
      t.string :id, null: false, index: true, unique:true

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


    #----------Create event roles for users----------
    #Each tables uses a composite key index - https://stackoverflow.com/questions/880981/in-a-join-table-whats-the-best-workaround-for-rails-absence-of-a-composite-ke/881028#881028
    create_table :event_coaches do |t|
      t.belongs_to :user
      t.belongs_to :event
    end
    add_index :event_coaches, [ :event_id, :user_id ], unique: true


    create_table :event_participants do |t|
      t.belongs_to :user
      t.belongs_to :event
      
      #t.boolean :verified
    end
    add_index :event_participants, [ :event_id, :user_id ], unique: true


    create_table :event_organizers do |t|
      t.belongs_to :user
      t.belongs_to :event
    end
    add_index :event_organizers, [ :event_id, :user_id ], unique: true
  end
end
