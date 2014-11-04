class UsersController < ApplicationController
	def index
		respond_to do |format|
			format.json{ render json: User.all.collect(&:custom_to_json) }
		end
	end

	def show
		respond_to do |format|
			format.json{ render json: User.find(params[:id]).custom_to_json }
		end
	end

	def add_favorite
		user = User.find(params[:id])
		user.favorite_articles << params[:articulo_id]
		if user.save
		  respond_to do |format|
		  	format.json { render json: user.custom_to_json }
		  end
		else
		  respond_to do |format|
		  	format.json { render json: user.custom_to_json }
		  end
		end
	end

	def favorite_articles
		user = User.find(params[:id])
		puts "USER " + user.to_json
		connector = ArticleConnector.new
		articles = []
		user.favorite_articles.each do |article_id|
			articles << connector.article(article_id)
		end
		respond_to do |format|
			format.json {render json: articles.to_json }
		end
	end
end