ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'test'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

module LoginHelper
  def token(user)
    username = user.username

    password = case username
    when 'admin'
      'testing1234'
    when 'testuser'
      'testing1234'
    else
      user.password
    end

    post '/api/v1/user/login', params: { 
      username: username, 
      password: password
    }, as: :json
    
    return response.parsed_body['token']
  end

  def register(user)
    post '/api/v1/user/register', 
      params: { 
        username: user.username,
        password: user.password,
        email: user.email
      }, as: :json
  end
end

module BookHelper
  def create(token, name, abstract, publisher_id, price = 0, author_ids = [])
    post "/api/v1/book", 
      params: { 
        name: name, 
        abstract: abstract, 
        price: price, 
        publisher_id: publisher_id,
        author_ids: author_ids
      },
      xhr: true,
      headers: { 'Authorization' => "Bearer #{token}" }
  end

  def update(token, id, name, abstract, publisher_id, price = 0, author_ids = [])
    patch "/api/v1/book/#{id}", 
      params: { 
        name: name, 
        abstract: abstract, 
        price: price, 
        publisher_id: publisher_id,
        author_ids: author_ids
      },
      xhr: true,
      headers: { 'Authorization' => "Bearer #{token}" }
  end

  def delete(token, id)
    delete "/api/v1/book/#{id}",
      xhr: true,
      headers: { 'Authorization' => "Bearer #{@token}" }
  end
end

class ActionDispatch::IntegrationTest
  include LoginHelper
end
