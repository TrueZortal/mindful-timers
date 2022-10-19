class CreateTimers < ActiveRecord::Migration[7.0]
  def change
    create_table :timers do |t|
      t.integer :initial_value
      t.timestamps
    end
  end
end
