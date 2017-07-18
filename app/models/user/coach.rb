class User::Coach < ApplicationRecord
  belongs_to :coach, class_name: "Coach", foreign_key: "coach_id"
  belongs_to :event
end
