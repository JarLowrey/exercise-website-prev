require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FitTogether
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    
    config.autoload_paths << Rails.root.join('lib')

    #custom global variables/config
    config.valid_social_profiles = [ 'Facebook', 'Website', 'Twitter', 'Pinterest', 'Reddit', 'Google Plus', 'Youtube', 'Instagram']
    config.genders = [ 'Not Telling', 'Male', 'Female']
  end
end