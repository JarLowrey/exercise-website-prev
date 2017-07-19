class User < ApplicationRecord
  validates :first_name, presence: true, allow_blank: false
  validates :last_name, presence: true, allow_blank: false
  validates :age, numericality: { only_integer:true, greater_than: 0 }, allow_nil: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  #user-event roles
  has_many :coaches, dependent: :destroy
  has_many :participants, dependent: :destroy
  has_many :organizers, dependent: :destroy

  has_one :address
  
end
