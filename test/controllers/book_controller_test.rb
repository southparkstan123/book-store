require "test_helper"

class BookControllerTest < ActionDispatch::IntegrationTest

  # setup do
  #   @book = book
  # end

  # book listing
  test 'should return success response for list all books' do
    get '/api/v1/book/list'
    assert_response 200
    
    assert_equal 4, response.parsed_body.count
  end

  # fetch a book record by ID 
  test 'should fetch a book record by ID' do
    get "/api/v1/book/show/1", 
    assert_response 200
  end

    # fetch a book record by ID 
    test 'should return error response when a record is not found' do
      get "/api/v1/book/show", params: { id: 11 }, xhr: true
      assert_response 404
    end
end
