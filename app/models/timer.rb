class Timer < ApplicationRecord
  def self.color_picker
    colors = {
      red: "black",
      blue: "white",
      black: "white",
      orange: "black",
      aquamarine: "black",
      yellow: "black",
      pink: "black",
      purple: "white"
    }
    background = colors.keys.sample
    text = colors[background]
    "background-color:#{background};color:#{text};"
  end
end


