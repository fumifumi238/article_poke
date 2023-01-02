class EffortValue < ApplicationRecord
  belongs_to :party
  validates :h, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :a, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :b, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :c, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :d, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :s, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 252}
  validates :sum, presence: true,numericality: {greater_than_or_equal_to: 0,less_than_or_equal_to: 510}
end
