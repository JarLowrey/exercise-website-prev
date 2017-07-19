class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :coaches, dependent: :destroy
  has_many :participants, dependent: :destroy
  has_many :organizers, dependent: :destroy
  
end
