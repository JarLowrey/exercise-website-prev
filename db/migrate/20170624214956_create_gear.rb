class CreateGear < ActiveRecord::Migration[5.1]
  
  def change
    create_table :gear_types do |t|
      t.string :name, null: false
      t.string :url
    end


    create_table :event_gear do |t|
      t.belongs_to :event

      t.boolean :mandatory
      t.decimal :cost, precision: 8, scale: 3, null: false #null=not available at event, 0=free, >0 = cost to purchase at event
    end
  end

end