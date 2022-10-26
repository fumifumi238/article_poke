FactoryBot.define do
  factory :article do
    sequence(:title){"sample"}
    sequence(:url) { |n| "https://example#{n}.com"}
    rate {2000}
    season {1}
    series {1}
    rank {100}
    user { nil }
  end
end
