module Api::V1::Author
  class AuthorController < ApiController
    before_action :authorized, except: [:list, :show]

    def list
      @authors = Author.all
      render json: @authors
    end

    def show
      @author = Author.find_by(id: params[:id])
      if @author
        render json: @author
      else
        render json: { message: 'Author not found!' }, status: 404
      end
    end

    def create
      @author = Author.new(author_params)
      @author.creator = logged_in_user
      @author.updater = logged_in_user

      if @author.save
        render json: @author
      else
        render json: { message: 'Error occurs!', errors: @author.errors.full_messages.uniq }, status: 422
      end
    end

    def update
      @author.update(author_params)
      @author.updater = logged_in_user

      if @author.update(author_params)
        render json: { message: "Book \"#{@user.username}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @author.errors.full_messages.uniq }, status: 422
      end
    end

    def delete
      @author = Author.find_by(id: params[:id])
      if @author.delete
        render json: { message: "Book \"#{@author.name}\" is deleted" }
      else
        render json: { message: 'Book not found!', errors: @author.errors.full_messages.uniq }, status: 404
      end
    end

    private

    def author_params
      params.require(:author).permit(:name, :description)
    end
  end
end

