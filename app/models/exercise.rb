class Exercise < ApplicationRecord
    has_many :exercise_names, dependent: :destroy, class_name: "Exercise::Name"
    has_one :preferred_exercise_name, class_name: "Exercise::Name" 
end
