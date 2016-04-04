require 'bundler'
Bundler.require

require './mta_status'
require './app'

run App::Server