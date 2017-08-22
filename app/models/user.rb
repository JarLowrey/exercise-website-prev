class User < ApplicationRecord
  validates :first_name, presence: true, allow_blank: false
  validates :last_name, presence: true, allow_blank: false
  validates :age, numericality: { only_integer:true, greater_than: 0 }, allow_nil: true
  validates :gender, inclusion: { in: 0..Rails.application.config.genders.length }  , allow_nil: true
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  #user-event roles
  has_many :workers, dependent: :destroy
  has_many :participants, dependent: :destroy
  has_many :admins, dependent: :destroy
  has_many :creator, dependent: :destroy

  has_one :address
  
  def gender_txt
    Rails.application.config.genders[self.gender]    
  end
end
