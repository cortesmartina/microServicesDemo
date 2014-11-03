class UsersController < ApplicationController
	def index
		respond_to do |format|
			format.json{ render json: User.all.collect(&:custom_to_json) }
		end
	end
end