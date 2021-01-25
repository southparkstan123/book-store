class Book < ApplicationRecord
  # validation rules
  validates :name,
            presence: { message: 'is required' },
            uniqueness: { message: '%{value} is already taken' }
  validates :abstract,
            presence: { message: 'is required' }
  
  # A book record can be created and updated by user
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: :created_books
  belongs_to :updater, class_name: 'User', foreign_key: :updater_id, inverse_of: :updated_books

  # A Book belongs to a publisher
  belongs_to :publisher, class_name: 'Publisher', foreign_key: 'publisher_id'

  # A Book belongs to many books
  has_and_belongs_to_many :authors
end
