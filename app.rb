require 'json'

module App
  class Server < Sinatra::Base
    configure :development do 
      register Sinatra::Reloader
    end

    get '/' do
      erb :index
    end

    get '/weather' do 
      weather = Wunderground.new(ENV["WUNDERGROUND_KEY"])
      forecast = weather.forecast_and_conditions_for(ENV["MY_ZIP_CODE"])["current_observation"]
      return_message = {
        :description => forecast['weather'],
        :current_temp => forecast['temp_f'].to_s,
        :wind_chill => forecast['windchill_f'],
        :icon_url => forecast['icon_url']
      }
      return_message.to_json
    end

    get '/trains' do 
      subway = MTAStatus.new
      train_456 = subway.get_train('456')[0]
      train_bdfm = subway.get_train('BDFM')[0]
      train_l = subway.get_train('L')[0]
      return_message = {
        :train_456 => { :name => train_456[:name], :status => train_456[:status] }, 
        :train_bdfm => { :name => train_bdfm[:name], :status => train_bdfm[:status] },
        :train_l => { :name => train_l[:name], :status => train_l[:status] }
      }
      return_message.to_json
    end

  end
end