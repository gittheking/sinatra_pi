require 'open-uri'

class MTAStatus

  def initialize
    doc = Nokogiri::XML(open("http://web.mta.info/status/serviceStatus.txt"))
    @lines = doc.xpath('//subway').xpath('//name').first(10).map do |line|
      line.text
    end
    @statuses = doc.xpath('//subway').xpath('//status').first(10).map do |status|
      status.text
    end
  end

  def get_trains_and_statuses
    train_status = @lines.zip @statuses
    train_status.map! { |line| {:name => line[0],:status => line[1]} }
    train_status
  end

  def get_train(train)
    train = get_trains_and_statuses.select { |line| line[:name] == train }
    if train.length == 1
      train
    else 
      "Something went wrong"
    end
  end

  def get_train_status(train)
    train = get_trains_and_statuses.select { |line| line[:name] == train }
    if train.length == 1
      train[0][:status]
    else 
      "Something went wrong"
    end
  end

end # end MTAStatus class