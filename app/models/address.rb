class Address < ApplicationRecord
    belongs_to :addressable, :polymorphic => true

    geocoded_by :address   # can also be an IP address
    #only geocode the address if it is passed in, coordinates are not, and the address has changed
    after_validation :geocode, if: ->(obj){ obj.address.present? and not (obj.latitude.present? and obj.longitude.present?) and obj.address_changed? }
    reverse_geocoded_by :latitude, :longitude
    after_validation :reverse_geocode  # auto-fetch address
    #only reverse geocode the coordinates if they are passed in, address is not, and the coordinates have changed
    after_validation :reverse_geocode, if: ->(obj){ (not obj.address.present? and obj.latitude.present? and obj.longitude.present?) and (obj.latitude_changed? or  obj.longitude_changed?) }
end
