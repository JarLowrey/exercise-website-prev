class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :coaches, class_name: "Coach", foreign_key: "coach_id"
  has_many :participants, class_name: "Participant", foreign_key: "participant_id"
  has_many :organizers, class_name: "Organizer", foreign_key: "organizer_id"
  
end
