class Party < ApplicationRecord
  belongs_to :article
  has_many :moves,dependent: :destroy
  has_many :individual_values,dependent: :destroy
  has_many :effort_values,dependent: :destroy
  validates :pokemon,presence: true
  validates :ability,presence: true
  validates :nature,presence: true
end
