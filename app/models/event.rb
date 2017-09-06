class Event < ApplicationRecord
    self.primary_key = :id
    before_create :set_id

    validates :name, presence: true, allow_blank: false
    validates :description, presence: true, allow_blank: false
    validates :min_participants, presence: true, allow_blank: false, numericality: { greater_than_or_equal_to: 0 }    
    validates :max_participants, presence: true, allow_blank: false, numericality: { greater_than_or_equal_to: :min_participants }    
    validates :start, presence: true
    validate  :start_is_in_future
    
    
    #user-event roles
    has_many :workers, dependent: :destroy
    has_many :participants, dependent: :destroy
    has_many :admins, dependent: :destroy
    has_one  :creator, dependent: :destroy

    #other data
    has_one :cost

    #exercise_instances
    has_many :exercise_instances, class_name: "Exercise::Instance"
    validates :exercise_instances, presence: true
    accepts_nested_attributes_for :exercise_instances, reject_if: :all_blank, allow_destroy: true
    
    #Address
    validates :address, presence: true, associated: true
    has_one :address, as: :addressable
    accepts_nested_attributes_for :address

    #Social Profile
    has_many :social_profiles, as: :shareable
    accepts_nested_attributes_for :social_profiles, reject_if: :all_blank, allow_destroy: true

    private
    def set_id
        self.id = ShortIds.new(Event)
    end

    def start_is_in_future
        if start <= Time.now
            errors.add(:start, "Must be in the future")
        end
    end
end