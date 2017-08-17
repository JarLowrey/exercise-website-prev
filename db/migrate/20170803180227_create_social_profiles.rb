class CreateSocialProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :social_profiles do |t|
      t.string :name, null:false
      t.string :url, null:false

      #polymorphic
      t.string :shareable_id, index: true
      t.string :shareable_type, index: true

      t.timestamps
    end
  end
end
