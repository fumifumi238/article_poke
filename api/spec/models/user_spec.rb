require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with a name, twitter' do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it 'is in valid with same name and twitter pair' do
    user = User.create(name: "name",twitter:"twitter")
    another_user = User.new(name: "name",twitter:"twitter")
    another_user.valid?
    expect(another_user.errors[:twitter]).to include("has already been taken")
  end

  it 'is invalid with same twitter if twitter is upper' do
    user = User.create(name: "name",twitter:"twitter")
    another_user = User.new(name: "name",twitter:"TWITTER")
    another_user.valid?
    expect(another_user.errors[:twitter]).to include("has already been taken")
  end



  describe 'name test' do
    let(:user) { FactoryBot.build(:user, name: name) }

    context 'when name is nil' do
      let(:name) { nil }

      it 'is invalid without a name' do
        user.valid?
        expect(user.errors[:name]).to include("can't be blank")
      end
    end

    context 'when name is longer than 20' do
      let(:name) { 'a' * 51 }
      it 'is too long' do
        user.valid?
        expect(user.errors[:name]).to include('is too long (maximum is 50 characters)')
      end
    end

    context 'when name is within 20 words' do
      let(:name) { 'a' * 50 }
      it 'is valid with name' do
        user.valid?
        expect(user.errors[:name]).to be_empty
      end
    end


  end

  describe 'twitter test' do
    let!(:created_user){FactoryBot.create(:user,twitter: "twitter")}
    let(:user){FactoryBot.build(:user,twitter: twitter)}

    context 'twitter is nil' do
      let(:twitter){nil}
      it 'is valid without twitter' do
        expect(user).to be_valid
      end
    end

    context 'twitter is already subscribed' do
      let(:twitter){"twitter"}
      it 'is valid with same twitter' do
        expect(user).to be_valid
      end
    end

    context 'twitter has symbol(not under var)' do
      let(:twitter){"@123abc>"}
      it 'is invalid symbol' do
        user.valid?
        expect(user.errors[:twitter]).to include('is invalid')
      end
    end

    context 'when twitter is longer than 15' do
      let(:twitter) { 'a' * 16 }
      it 'is too long' do
        user.valid?
        expect(user.errors[:twitter]).to include('is too long (maximum is 15 characters)')
      end
    end

    context 'when twitter is within 15 words' do
      let(:twitter) { 'a' * 15 }
      it 'is valid with name' do
        user.valid?
        expect(user.errors[:twitter]).to be_empty
      end
    end




  end


end
