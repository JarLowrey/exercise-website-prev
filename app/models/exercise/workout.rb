class Exercise::Workout < ApplicationRecord
    belongs_to :exercise
    belongs_to :event
    
    validates :duration, numericality: { greater_than: 0 }
    validates :distance, numericality: { greater_than: 0 }

    accepts_nested_attributes_for :exercise
end
