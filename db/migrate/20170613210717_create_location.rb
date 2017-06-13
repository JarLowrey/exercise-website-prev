class CreateLocation < ActiveRecord::Migration[5.1]
  def change
    create_table :locations do |t|
      t.string :zip
      t.string :street
      t.string :city
      t.string :state
      t.string :country

      # https://stackoverflow.com/questions/1196174/correct-datatype-for-latitude-and-longitude-in-activerecord
      # https://gis.stackexchange.com/questions/8650/measuring-accuracy-of-latitude-and-longitude
      t.decimal :lat,                null: false, precision: 10, scale:6
      t.decimal :lng,                null: false, precision:10, scale:6
    end
  end
end
