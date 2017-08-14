class Event < ApplicationRecord
    validates :name, presence: true, allow_blank: false
    validates :description, presence: true, allow_blank: false

    #user-event roles
    has_many :workers, dependent: :destroy
    has_many :participants, dependent: :destroy
    has_many :admins, dependent: :destroy
    has_one  :creator, dependent: :destroy

    #other data
    has_one :cost
    has_many :exercises
    
    #Address table
    validates :address, presence: true, associated: true
    has_one :address, as: :addressable
    accepts_nested_attributes_for :address

    #Social Profile table
    validates :social_profile, presence: true, associated: true
    has_one :social_profile, as: :shareable
    accepts_nested_attributes_for :social_profile

    self.primary_key = :id
    before_create :set_id

    private
        def set_id
            self.id = ShortIds.new(Event)
        end
end