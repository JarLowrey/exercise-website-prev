class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercise_types do |t|
      t.string :name, null: false
      t.string :icon_url
      t.boolean :verified, null: false
    end

    create_table :exercise_instances do |t|
      t.float :duration, null: false
      t.float :distance,

      t.timestamps
    end
  end
end
