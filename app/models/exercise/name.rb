class Exercise::Name < ApplicationRecord
    validates_uniqueness_of :name
    validates :name, presence: true, allow_blank: false

    belongs_to :exercise
end
