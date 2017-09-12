class Address < ApplicationRecord
    validates :street_address, presence: true, allow_blank: false
    validates :latitude, presence: true, allow_blank: false
    validates :longitude, presence: true, allow_blank: false


    belongs_to :addressable, polymorphic: true, optional: true

    geocoded_by :street_address   # can also be an IP address
    #only geocode the address if it is passed in, coordinates are not, and the address has changed
    after_validation :geocode, if: ->(obj){ obj.street_address.present? and not (obj.latitude.present? and obj.longitude.present?) and obj.street_addr_changed? }
    
    reverse_geocoded_by :latitude, :longitude
    #only reverse geocode the coordinates if they are passed in, address is not, and the coordinates have changed
    after_validation :reverse_geocode, if: ->(obj){ (not obj.street_address.present? and obj.latitude.present? and obj.longitude.present?) and (obj.latitude_changed? or  obj.longitude_changed?) }
end
