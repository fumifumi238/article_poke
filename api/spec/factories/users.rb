FactoryBot.define do
  factory :user do
     sequence(:name) { |n| "Tester#{n}"}
     sequence(:twitter) { |n| "tester_#{n}" }
  end
end
