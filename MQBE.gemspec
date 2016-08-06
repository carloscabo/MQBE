# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'mqbe/version'

Gem::Specification.new do |spec|
  spec.name          = "mqbe"
  spec.version       = Mqbe::VERSION
  spec.authors       = ["carloscabo"]
  spec.email         = ["carloscabo@gmail.com"]

  spec.summary       = "Small JS lib that fires events when you enter / leave a CSS mediaquery"
  spec.description   = "This small javascript library creates JQuery events that are fired when you enter or leave a CSS media query state, for instance from desktop to tablet... etc. It's useful when you need to start or stop some JS functionallity depending on MediaQuery changes / states."
  spec.homepage      = "https://github.com/carloscabo/MQBE"
  spec.license       = "MIT"

  # spec.metadata['allowed_push_host'] = "https://rubygems.org"

  spec.files         = Dir["{lib,dist}/**/*"]
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_development_dependency "rake", "~> 10.0"
end
