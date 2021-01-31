ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

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
      params: user, as: :json
  end

  def login(user)
    post '/api/v1/user/login', 
      params: user, as: :json
  end
end

module CRUDHelper
  def get_list(module_name, token = nil)
    get "/api/v1/#{module_name}/list", 
      xhr: true
  end

  def get_item(module_name, id, token = nil)
    get "/api/v1/#{module_name}/#{id}", 
      xhr: true
  end

  def create_item(module_name, params, token = nil)
    post "/api/v1/#{module_name}", 
      params: params,
      xhr: true,
      headers: { 'Authorization' => "Bearer #{token}" }
  end

  def update_item(module_name, id, params, token = nil)
    patch "/api/v1/#{module_name}/#{id}", 
      params: params,
      xhr: true,
      headers: { 'Authorization' => "Bearer #{token}" }
  end

  def delete_item(module_name, id, token = nil)
    delete "/api/v1/#{module_name}/#{id}",
      xhr: true,
      headers: { 'Authorization' => "Bearer #{token}" }
  end
end

class ActionDispatch::IntegrationTest
  include LoginHelper
  include CRUDHelper
end
