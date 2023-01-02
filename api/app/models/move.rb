class Move < ApplicationRecord
  belongs_to :party
  validates :pokemon,presence: true
  validates :name,presence: true
end
