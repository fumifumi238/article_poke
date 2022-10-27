FactoryBot.define do
  factory :move do
    pokemon { "MyString" }
    name { "MyString" }
    season { 1 }
    rank { 1 }
    series { 1 }
    article { nil }
  end
end
