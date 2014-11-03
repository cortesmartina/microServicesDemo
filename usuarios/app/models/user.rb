class User < ActiveRecord::Base
	#Associations
	has_many :preferences

	def custom_to_json
      to_json(include: :preferences)
	end

end