require 'rails_helper'

RSpec.describe Article, type: :model do
  it 'is valid without rank and rate' do
    @user = User.create(name: "sample",twitter:"sample_twitter")
    article = Article.new(title:"sample",url:"https://sample.com",user: @user,season:1,series:1)
    expect(article).to be_valid
  end

describe 'url test' do
   let(:user) { FactoryBot.build(:user) }
   let(:article){FactoryBot.build(:article,url: url,user:user)}
  context 'when url is nil' do
   let(:url){nil}
    it 'is invalid without url' do
      article.valid?
      expect(article.errors[:url]).to include("can't be blank")
    end
  end

    context 'when url is longer than 100' do
      let(:url) { 'https://'+'a' * 100 }
      it 'is too long' do
        article.valid?
        expect(article.errors[:url]).to include("is too long (maximum is 100 characters)")
      end
    end

    context 'when url is https://example.com' do
      let(:url){ 'https://example.com'}
      it 'is valid with url' do
        expect(article).to be_valid
      end
    end

    context 'when url is not http or https' do
      let(:url){ 'httpn://example.com'}
      it 'is too long' do
        article.valid?
        expect(article.errors[:url]).to include('is invalid')
      end
    end

end

describe 'user test' do
    let(:article){FactoryBot.build(:article,user: user)}

  context' when user is nil' do
    let(:user){nil}
    it 'is invalid without user' do
      article.valid?
      expect(article.errors[:user]).to include("must exist")
    end
  end

  context 'when user is already exist' do
    created_user = User.create(name:"aaaa",twitter:"bbbb")
    let(:user){  User.find_or_create_by(name:"aaaa",twitter:"bbbb")}
    it 'is valid existed user' do
      expect(article).to be_valid
    end
  end

  context 'when user is not exist' do
    let(:user){  User.find_or_create_by(name:"aaaa",twitter:"bbbb")}
    it 'is valid existed user' do
      expect(article).to be_valid
    end
  end
end

describe 'rate test' do
  let(:user) { FactoryBot.build(:user) }
  let(:article){FactoryBot.build(:article,user:user,rate: rate)}
  context 'when rate is 2000' do
    let(:rate){2000}
    it 'is valid rate < 10000 and rate > 100' do
      expect(article).to be_valid
    end
  end

  context 'when rate is 100' do
    let(:rate){100}
    it 'is invalid rate is less than 100' do
      article.valid?
      expect(article.errors[:rate]).to include('must be greater than 100')
    end
  end

  context 'when rate is 10000' do
    let(:rate){10000}
    it 'is invalid rate is greater than 10000' do
      article.valid?
      expect(article.errors[:rate]).to include('must be less than 10000')
    end
  end

  context 'when rate is nil' do
    let(:rate){nil}
    it 'is valid without rate' do
      expect(article).to be_valid
    end
  end

  context 'when rate is 101' do
    let(:rate){101}
    it 'is valid rate is greater than 100' do
      expect(article).to be_valid
    end
  end

  context 'when rate is nil' do
    let(:rate){9999}
    it 'is valid rate is less than 10000' do
      expect(article).to be_valid
    end
  end

end

describe 'rank test' do
  let(:user) { FactoryBot.build(:user) }
  let(:article){FactoryBot.build(:article,user:user,rank: rank)}
  context 'when rank is 2000' do
    let(:rank){2000}
    it 'is valid rank < 100000 and rank > 0' do
      expect(article).to be_valid
    end
  end

  context 'when rank is 100' do
    let(:rank){0}
    it 'is invalid rank is less than 0' do
      article.valid?
      expect(article.errors[:rank]).to include('must be greater than 0')
    end
  end

  context 'when rank is 10000' do
    let(:rank){100000}
    it 'is invalid rank is greater than 100000' do
      article.valid?
      expect(article.errors[:rank]).to include('must be less than 100000')
    end
  end

  context 'when rank is nil' do
    let(:rank){nil}
    it 'is valid without rank' do
      expect(article).to be_valid
    end
  end

  context 'when rank is 1' do
    let(:rank){1}
    it 'is valid rank is greater than 0' do
      expect(article).to be_valid
    end
  end

  context 'when rank is nil' do
    let(:rank){99999}
    it 'is valid rank is less than 100000' do
      expect(article).to be_valid
    end
  end


end

describe 'title test' do
  let(:user) { FactoryBot.build(:user) }
  let(:article){FactoryBot.build(:article,user:user,title:title)}

  context 'when title is nil' do
   let(:title){nil}
    it 'is invalid without title' do
      article.valid?
      expect(article.errors[:title]).to include("can't be blank")
    end
  end

  context 'when title is longer than 100' do
    let(:title) { 'a' * 51 }
      it 'is too long' do
        article.valid?
        expect(article.errors[:title]).to include("is too long (maximum is 50 characters)")
      end
  end

  context 'when title is nil' do
    let(:title){"a"*50}
    it 'is valid title is within 50' do
      expect(article).to be_valid
    end
  end

end

end
