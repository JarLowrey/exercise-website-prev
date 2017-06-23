class Event < ApplicationRecord
    #user roles
    has_many :coaches
    has_many :attendees
    has_many :event_organizers
    #other data
    has_one :location
    has_many :exercise_instances
end
