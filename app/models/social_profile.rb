require 'uri'

class SocialProfile < ApplicationRecord
  belongs_to :shareable, polymorphic: true, optional: true
  
  #validates :name, presence: true, allow_blank: false, inclusion: { in: Rails.application.config.valid_social_profiles }  
  #validates :url, presence: true, allow_blank: false


  validate :all_present, :valid_url

  def name=(str)
    super(str.titleize)
  end
   
  
  private

    def all_present
      if name.blank? or url.blank?
        errors.add(:base, "Name and URL must both be specified")
      end
    end
    
    def valid_url
      uri = URI.parse(url)
      if !uri.is_a?(URI::HTTP) || uri.host.nil?
        errors.add(:base, "URL is invalid")
      end
    end
end
