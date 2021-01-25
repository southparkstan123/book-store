Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      get 'greeting', to: 'message#greeting'
      namespace 'user' do
        post '/register', to: 'user#create'
        post '/login', to: 'user#login'
        get '/auto_login', to: 'user#auto_login'
      end
    end
  end
  root to: 'home#index'
  get '/*path', to: 'home#index'
end
