class AddAlertTypeToTimers < ActiveRecord::Migration[7.0]
  def change
    add_column :timers, :alert_type, :string
  end
end
