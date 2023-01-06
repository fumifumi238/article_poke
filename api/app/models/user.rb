class User < ApplicationRecord
  before_save { twitter.downcase! }
  has_many :articles,dependent: :destroy
  validates :name,presence: true, length: { maximum: 50 }
  VALID_TWITTER_REGEX = /\A[0-9a-zA-Z_]{,15}\z/
  validates :twitter,length: {maximum: 20},format: { with: VALID_TWITTER_REGEX }
  validates_uniqueness_of :twitter, :scope => [:name], case_sensitive: false
end
