class TimersController < ApplicationController
  before_action :set_timer, only: [:show, :destroy]
  def show; end

  def new; end

  def create
    @timer = Timer.new(timer_params)

    respond_to do |format|
      if @timer.save
        format.html { render :new, notice: "successfully timed" }
        format.turbo_stream
      else

      end
    end
  end

  def destroy
    @timer.destroy

    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  private

  def set_timer
    @timer = Timer.find(params['id'])
  end

  def timer_params
    params.permit(:initial_value, :alert_type, :activity_duration)
  end
end
