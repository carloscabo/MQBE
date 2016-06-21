# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'MQBE/version'

Gem::Specification.new do |spec|
  spec.name          = "MQBE"
  spec.version       = MQBE::VERSION
  spec.authors       = ["carloscabo"]
  spec.email         = ["carloscabo@gmail.com"]

  spec.summary       = "Small JS lib that fires events when you enter / leave a CSS mediaquery"
  spec.description   = "This small javascript library creates JQuery events that are fired when you enter or leave a CSS media query state, for instance from desktop to tablet... etc. It's useful when you need to start or stop some JS functionallity depending on MediaQuery changes / states."
  spec.homepage      = "https://github.com/carloscabo/MQBE"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org by setting 'allowed_push_host', or
  # delete this section to allow pushing this gem to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_development_dependency "rake", "~> 10.0"
end
