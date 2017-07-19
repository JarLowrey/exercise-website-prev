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
    create_table :event_coaches do |t|
      t.belongs_to :user
      t.belongs_to :event
    end

    create_table :event_participants do |t|
      t.belongs_to :user
      t.belongs_to :event
      
      #t.boolean :verified
    end

    create_table :event_organizers do |t|
      t.belongs_to :user
      t.belongs_to :event
    end
  end
end
