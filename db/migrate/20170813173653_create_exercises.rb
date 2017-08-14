class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercises do |t|
      t.string :icon_url
      t.text :description
    end
    
    create_table :exercise_names do |t|
      t.string :name, null: false, index: true
      t.belongs_to :exercise
    end
  end
end
