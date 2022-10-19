class AddActivityDurationToTimer < ActiveRecord::Migration[7.0]
  def change
    add_column :timers, :activity_duration, :integer
  end
end
