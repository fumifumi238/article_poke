class Party < ApplicationRecord
  belongs_to :article
  has_many :moves
  validates :pokemon,presence: true
  validates :ability,presence: true
  validates :nature,presence: true
end
