class SocialProfile < ApplicationRecord
  belongs_to :shareable, polymorphic: true, optional: true
end
