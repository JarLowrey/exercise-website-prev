class CreateSocialProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :social_profiles do |t|
      t.string :website
      t.string :twitter
      t.string :pinterest
      t.string :reddit
      t.string :google_plus
      t.string :youtube
      t.string :facebook
      t.string :instagram

      #polymorphic
      t.string :shareable_id, index: true
      t.string :shareable_type, index: true


      t.timestamps
    end
  end
end
