class CreateGear < ActiveRecord::Migration[5.1]
  
  def change
    create_table :gear_types do |t|
      t.string :name, null: false
      t.string :url
    end


    create_table :event_gear do |t|
      t.belongs_to :event

      t.boolean :mandatory
    end
  end

end