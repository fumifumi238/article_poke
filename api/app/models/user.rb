class User < ApplicationRecord
  before_save { twitter.downcase! }
  validates :name,presence: true, length: { maximum: 50 }
  VALID_TWITTER_ID_REGEX = /\A[0-9\a-z\A-Z\_]{1,15}\z/
  validates :twitter,presence: true,length: {maximum: 15},format: { with: VALID_TWITTER_ID_REGEX },uniqueness: { case_sensitive: false }
end
