class CreateExercises < ActiveRecord::Migration[5.1]
  def change
    create_table :exercise do |t|
      t.string :name, null: false
      t.string :icon_url
      t.boolean :verified, null: false
    end
  end
end
