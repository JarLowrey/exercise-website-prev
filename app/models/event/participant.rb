class Event::Participant < ApplicationRecord
  enum event_role_type: [:admin, :creator, :worker, :participant]

  belongs_to :event
  belongs_to :user
  validates_uniqueness_of :event_id, :scope => :user_id, :message => "User is already participating in this event"
end
