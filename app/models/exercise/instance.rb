class Exercise::Instance < ApplicationRecord
    belongs_to :exercise, optional: true
    belongs_to :event, optional: true
    validates :exercise_name, presence: true, allow_blank: false
    
    #validates :duration, numericality: { greater_than: 0 }
    validates :distance, numericality: { greater_than: 0 }


    def exercise_name
        exercise.preferred_exercise_name.name if exercise != nil and exercise.preferred_exercise_name != nil
    end

    #the user's provided exercise name is used to associate a given exercise on this model   
    def exercise_name=(name)
        name_obj = Exercise::Name.find_by_name(name) if name.present?
        self.exercise = name_obj.exercise if defined? name_obj and name_obj != nil
    end
end
