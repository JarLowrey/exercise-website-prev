class Participant < ApplicationRecord
  belongs_to :participant, class_name: "Participant", foreign_key: "participant_id"
end
