class Article < ApplicationRecord
  belongs_to :user
  has_many :parties,dependent: :destroy
  VALID_URL_REGEX = /\Ahttps?:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+\z/
  validates :url,presence: true,format: { with: VALID_URL_REGEX },uniqueness: { case_sensitive: false }
  validates :season,presence: true, numericality: {greater_than: 0,less_than: 100}
  validates :series,presence: true, numericality: {greater_than: 0,less_than: 100}
  validates :rate, allow_nil: true,numericality: {greater_than: 100,less_than: 10000}
  validates :rank, allow_nil: true,numericality: {greater_than: 0,less_than: 100000}
  validates :title,presence: true,length:{maximum: 255}
  validates :rental,allow_nil: true,length: {maximum: 6}
end
