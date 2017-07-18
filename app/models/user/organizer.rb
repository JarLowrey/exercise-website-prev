class User::Organizer < ApplicationRecord
  belongs_to :organizer, class_name: "Organizer", foreign_key: "organizer_id"
end
