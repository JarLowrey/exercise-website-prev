class SocialProfile < ApplicationRecord
  belongs_to :shareable, polymorphic: true, optional: true
  validates :name, inclusion: { in: Rails.application.config.valid_social_profiles }  
end
