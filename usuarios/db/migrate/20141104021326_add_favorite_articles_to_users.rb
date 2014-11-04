class AddFavoriteArticlesToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :favorite_articles, :serialize
  end
end
