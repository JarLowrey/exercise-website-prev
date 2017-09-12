class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|     
      t.string :street_address, null: false

      # https://stackoverflow.com/questions/1196174/correct-datatype-for-latitude-and-longitude-in-activerecord
      # https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
      t.decimal :latitude,  null: false, precision: 10, scale: 6, index: true
      t.decimal :longitude, null: false, precision: 10, scale: 6, index: true

      #polymorphic behavior - https://kconrails.com/2010/10/19/common-addresses-using-polymorphism-and-nested-attributes-in-rails/
      t.string :addressable_id, index: true
      t.string :addressable_type, index: true
    end
  end
end
