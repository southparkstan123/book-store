class User < ApplicationRecord
  has_secure_password
  validates :username,
            length: { minimum: 5, too_short: 'at least %{count} characters' },
            presence: { message: 'is required' },
            uniqueness: { message: '%{value} is already taken' }
  validates :email,
            format: { with: URI::MailTo::EMAIL_REGEXP, message: 'format is invalid' },
            uniqueness: { message: '%{value} is already taken' }
  validates :password,
            length: { minimum: 6, too_short: 'at least %{count} characters' },
            presence: { message: 'is required' },
            confirmation: true
end
