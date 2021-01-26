module Api::V1::Book
  class BookController < ApiController
    before_action :authorized, except: [:list, :show]

    def list
      @books = Book.all
      render json: @books
    end

    def show
      @book = Book.find_by(id: params[:id])
      if @book
        render json: @book
      else
        render json: { message: 'Book not found!' }, status: 404
      end
    end

    def create
      @book = Book.new(book_params)
      @book.creator = logged_in_user
      @book.updater = logged_in_user

      @book.authors << [book_B, book_C, book_D]

      if @book.save
        render json: @book
      else
        render json: { message: 'Error occurs!', errors: @book.errors.full_messages.uniq }, status: 422
      end
    end

    def update
      @book.update(book_params)
      @book.updater = logged_in_user

      if @book.update(book_params)
        render json: { message: "Book \"#{@user.username}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @book.errors.full_messages.uniq }, status: 422
      end
    end

    def delete
      @book = Book.find_by(id: params[:id])
      if @book.delete
        render json: { message: "Book \"#{@book.name}\" is deleted" }
      else
        render json: { message: 'Book not found!', errors: @book.errors.full_messages.uniq }, status: 404
      end
    end

    private

    def book_params
      params.require(:book).permit(:name, :abstract, :price, :publisher, authors_id: [])
    end

  end
end

