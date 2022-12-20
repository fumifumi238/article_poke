class ApplicationController < ActionController::API
  private
  def get_articles_with_party(articles,parties)
    arr = []
    articles.each do |article|
      party = parties[article]
      value = {id: article.id,
              url: article.url,
              rate: article.rate,
              rank: article.rank,
              season: article.season,
              title: article.title,
              rental: article.rental,
              tn: article.tn,
              twitter: article.twitter,
              party: party}
      arr.push(value)
    end
    arr
   end
end
