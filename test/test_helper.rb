if ENV['COVERAGE']
  require 'simplecov'
  require 'simplecov-json'

  SimpleCov.start 'rails' do
    add_filter '/bin/'
    add_filter '/db/'
    add_filter '/test/'

    add_group 'Models', 'app/models'
    add_group 'Controllers', 'app/controllers/api/v1'
  end
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require_relative './helpers/login_helper.rb'
require_relative './helpers/crud_helper.rb'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: 2)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include LoginHelper, CRUDHelper
end
