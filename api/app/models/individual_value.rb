class IndividualValue < ApplicationRecord
  belongs_to :party
  validates :h, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
  validates :a, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
  validates :b, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
  validates :c, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
  validates :d, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
  validates :s, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 31}
end
