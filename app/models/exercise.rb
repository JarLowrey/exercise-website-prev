class Exercise < ApplicationRecord
    has_many :names, dependent: :destroy
    has_one :name, as: :preferred_name
end
