class Group < ApplicationRecord
    has_one :location
    has_one :group_type
end
