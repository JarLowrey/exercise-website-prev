class SocialProfile < ApplicationRecord
  belongs_to :shareable, polymorphic: true, optional: true
  
  validates :name, presence: true, allow_blank: false, inclusion: { in: Rails.application.config.valid_social_profiles }  
  validates :url, presence: true, allow_blank: false
end
