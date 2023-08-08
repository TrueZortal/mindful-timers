lock "~> 3.17.3"

set :application, "mindful-timers"
set :repo_url, "git@github.com:TrueZortal/mindful-timers.git"
set :branch, :main
set :deploy_to, "/home/timers_deploy/#{fetch :application}"
append :linked_files, 'config/master.key', 'config/credentials.yml.enc'
