class Event < ApplicationRecord
    validates :name, presence: true, allow_blank: false
    validates :description, presence: true, allow_blank: false

    #user roles
    has_many :coaches
    has_many :attendees
    has_many :event_organizers
    #other data
    has_one :cost
    has_many :exercise_instances
    
    has_one :address, as: :addressable
    accepts_nested_attributes_for :address

    self.primary_key = :id
    before_create :set_id

    private
        def set_id
            self.id = ShortIds.new(Event)
        end
end