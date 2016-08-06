module Mqbe
  module Rails
    class Engine < ::Rails::Engine
      initializer 'mqbe' do |app|
        app.config.assets.paths << Mqbe.javascripts_path
        app.config.assets.paths << Mqbe.stylesheets_path
        app.middleware.use ::ActionDispatch::Static, Mqbe.assets_path
      end
    end
  end
end
