class Timer < ApplicationRecord
  def self.color_picker
    colors = {
      # red: "black",
      # orange: "black",
      "#5b9311": "black",
      # aquamarine: "black",
      # yellow: "black",
      # pink: "black"
    }
    background = colors.keys.sample
    text = colors[background]
    "background-color:#{background};color:#{text};"
  end
end
