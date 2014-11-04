class User < ActiveRecord::Base
	
	serialize :favorite_articles, Array

	#Associations
	has_many :preferences

	def custom_to_json
      to_json(include: [:preferences])
	end

end