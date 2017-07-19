class Event::Organizer < ApplicationRecord
  belongs_to :event
  belongs_to :user
end
