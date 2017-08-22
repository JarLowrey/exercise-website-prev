class SocialProfile < ApplicationRecord
  belongs_to :shareable, polymorphic: true, optional: true
  
  #validates :name, presence: true, allow_blank: false, inclusion: { in: Rails.application.config.valid_social_profiles }  
  #validates :url, presence: true, allow_blank: false


  validate :all_present
  
  private

    def all_present
      if name.blank? or url.blank?
        errors.add(:base, "Name and URL must both be specified")
      end
    end
end
