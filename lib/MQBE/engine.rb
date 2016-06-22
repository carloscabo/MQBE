module MQBE
  module Rails
    class Engine < ::Rails::Engine
      initializer 'mqbe' do | app |
        mqbe_path = File.expand_path("../../../dist", __FILE__)
        # Rails.logger.info(mqbe_path)
        app.config.assets.paths << mqbe_path
        app.middleware.use ::ActionDispatch::Static, "#{root}/dist"
      end
    end
  end
end
