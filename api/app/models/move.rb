class Move < ApplicationRecord
  belongs_to :article
  validates :pokemon,presence: true
  validates :name,presence: true
end
