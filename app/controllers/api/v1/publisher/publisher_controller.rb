module Api::V1::Publisher
  class PublisherController < ApiController
    before_action :authorized, except: [:list, :show]

    def list
      @publishers = Publisher.all
      render json: @publishers
    end

    def show
      @publisher = Publisher.find_by(id: params[:id])
      if @publisher
        render json: @publisher
      else
        render json: { message: 'Publisher not found!' }, status: 404
      end
    end

    def create
      @publisher = Publisher.new(publisher_params)
      @publisher.creator = logged_in_user
      @publisher.updater = logged_in_user

      @publisher.authors << [book_B, book_C, book_D]

      if @publisher.save
        render json: @publisher
      else
        render json: { message: 'Error occurs!', errors: @publisher.errors.full_messages.uniq }, status: 422
      end
    end

    def update
      @publisher.update(publisher_params)
      @publisher.updater = logged_in_user

      if @publisher.update(publisher_params)
        render json: { message: "Book \"#{@user.username}\" is updated" }
      else
        render json: { message: 'Error occurs!', errors: @publisher.errors.full_messages.uniq }, status: 422
      end
    end

    def delete
      @publisher = Publisher.find_by(id: params[:id])
      if @publisher.delete
        render json: { message: "Book \"#{@publisher.name}\" is deleted" }
      else
        render json: { message: 'Book not found!', errors: @publisher.errors.full_messages.uniq }, status: 404
      end
    end

    private

    def publisher_params
      params.require(:publisher).permit(:name, :description)
    end
  end
end
