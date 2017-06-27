class ExerciseType < ApplicationRecord
    before_save :standardize_icon_links

    def standardize_icon_links
        self.icon_url.prepend("/images/icons/exercises/")
    end
end
