class Party < ApplicationRecord
  belongs_to :article
  validates :pokemon,presence: true
  validates :ability,presence: true
  validates :nature,presence: true
end
