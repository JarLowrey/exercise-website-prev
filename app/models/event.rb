class Event < ApplicationRecord
    validates :name, presence: true, allow_blank: false
    validates :description, presence: true, allow_blank: false
    validates :min_participants, presence: true, allow_blank: false, numericality: { greater_than_or_equal_to: 0 }    
    validates :max_participants, presence: true, allow_blank: false, numericality: { greater_than_or_equal_to: :min_participants }    
    validates :start, presence: true
    validates_date :start, on_or_after: :today
    
    #user-event roles
    has_many :workers, dependent: :destroy
    has_many :participants, dependent: :destroy
    has_many :admins, dependent: :destroy
    has_one  :creator, dependent: :destroy

    #other data
    has_one :cost

    #Workouts
    has_many :workouts, class_name: "Exercise::Workout"
    validates :workouts, presence: true
    accepts_nested_attributes_for :workouts, reject_if: :all_blank, allow_destroy: true
    
    #Address table
    validates :address, presence: true, associated: true
    has_one :address, as: :addressable
    accepts_nested_attributes_for :address

    #Social Profile table
    has_many :social_profiles, as: :shareable
    accepts_nested_attributes_for :social_profiles, reject_if: :all_blank, allow_destroy: true

    self.primary_key = :id
    before_create :set_id

    private
        def set_id
            self.id = ShortIds.new(Event)
        end
end