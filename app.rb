module App
  class Server < Sinatra::Base
    configure :development do 
      register Sinatra::Reloader
    end

    get '/' do
      subway = MTAStatus.new
      @lines = []
      @lines.push(subway.get_train('456'))
      @lines.push(subway.get_train('L'))
      binding.pry
    end
  end
end