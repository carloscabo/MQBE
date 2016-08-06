require "mqbe/version"

module Mqbe
  class << self
    def load!
      if defined?(::Rails)
        register_rails_engine
      elsif defined?(::Sprockets)
        register_sprockets
      end
      configure_sass
    end

    def assets_path
      @gem_path ||= File.expand_path "../assets", File.dirname(__FILE__)
    end

    def stylesheets_path
      File.join assets_path, 'stylesheets'
    end

    def javascripts_path
      File.join assets_path, 'javascripts'
    end

    private

    def configure_sass
      require 'sass'
      ::Sass.load_paths << stylesheets_path
    end

    def register_rails_engine
      require "mqbe/engine"
    end

    def register_sprockets
      Sprockets.append_path(stylesheets_path)
      Sprockets.append_path(javascripts_path)
    end
  end
end

Mqbe.load!
