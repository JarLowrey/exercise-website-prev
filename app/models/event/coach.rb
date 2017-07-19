class Event::Coach < ApplicationRecord
  belongs_to :event, dependent: :destroy
  belongs_to :user, dependent: :destroy
end