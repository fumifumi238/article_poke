class Move < ApplicationRecord
  belongs_to :party,dependent: :destroy
  validates :pokemon,presence: true
  validates :name,presence: true
end
