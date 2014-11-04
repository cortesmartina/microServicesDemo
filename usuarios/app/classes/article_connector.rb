class ArticleConnector
  include HTTParty
  base_uri "http://localhost:3000"
  
  def articles
    self.class.get("/articulo")
  end

  def article id
  	self.class.get("/articulo/" + id.to_s )
  end
end