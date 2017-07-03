class Event < ApplicationRecord
    #user roles
    has_many :coaches
    has_many :attendees
    has_many :event_organizers
    #other data
    has_one :cost
    has_many :exercise_instances
    
    has_one :address, as: :addressable
    accepts_nested_attributes_for :address
end
