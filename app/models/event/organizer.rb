class Event::Organizer < ApplicationRecord
  belongs_to :event
  belongs_to :user
  validates_uniqueness_of :event_id, :scope => :user_id, :message => "User is already organizing this event"
end
