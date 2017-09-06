# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

#Create Exercises
=begin
ExerciseType.create! name: "Run", icon_url: "icons8-Running-48.png", verified: true
ExerciseType.create! name: "Walk", icon_url: "icons8-Walking-48.png", verified: true
ExerciseType.create! name: "Lift", icon_url: "icons8-WeightLifting-48.png", verified: true
ExerciseType.create! name: "Swim", icon_url: "icons8-Swimming-48.png", verified: true
ExerciseType.create! name: "Bike", icon_url: "icons8-Cycling-48.png", verified: true
ExerciseType.create! name: "Mountain Bike", icon_url: "icons8-Cycling Mountain Bike-48.png", verified: true
ExerciseType.create! name: "Basketball", icon_url: "icons8-Basketball-48.png", verified: true
ExerciseType.create! name: "Football", icon_url: "icons8-Football-48.png", verified: true
ExerciseType.create! name: "Soccer", icon_url: "icons8-Soccer Ball-48.png", verified: true
ExerciseType.create! name: "Rugby", icon_url: "icons8-Rugby-48.png", verified: true
ExerciseType.create! name: "Frisbee", icon_url: "icons8-Frisbee-48.png", verified: true
=end

run = Exercise.create! description: "Running around", icon_url: "icons8-Running-48.png"
run_names = [ 
    Exercise::Name.create!(name: "Run", exercise: run),
    Exercise::Name.create!(name: "Ran", exercise: run),
    Exercise::Name.create!(name: "Running", exercise: run),
    Exercise::Name.create!(name: "Jog", exercise: run)
]
run.exercise_names.push(run_names)
run.preferred_exercise_name = run_names[0]

swim = Exercise.create! description: "this one sucks", icon_url: "icons8-Swimming-48.png"
swim_names = [ 
    Exercise::Name.create!(name: "Swim", exercise: swim),
    Exercise::Name.create!(name: "Swam", exercise: swim),
    Exercise::Name.create!(name: "Paddle", exercise: swim)
    #What to do about freestyle, kick board, etc exercises - ie sub groups? Is this the advantage of a tagging system?
]
swim.exercise_names.push(swim_names)
swim.preferred_exercise_name = swim_names[0]

#Create users
user1 = User.create! email: "user1@example.com", password: "12345678", first_name: "James", last_name: "Lowrey"
user2 = User.create! email: "user2@example.com", password: "12345678", first_name: "James", last_name: "Lowrey"
user3 = User.create! email: "user3@example.com", password: "12345678", first_name: "James", last_name: "Lowrey"

#create events
events = []

event1 = Event.create!( 
    name: "Test", 
    description: "Testing event in DB", 
    min_participants: 1,
    max_participants: 5,
    start: DateTime.now + 10,
    address: Address.create!(street_addr: "Columbus OH USA", latitude: 39.9612, longitude: -82.9988),
    social_profiles: [ SocialProfile.create!(name: "facebook", url: "http://facebook.com") ], 
    exercise_instances: [ Exercise::Instance.create!(exercise_id: run.id, distance: 2), Exercise::Instance.create!(exercise_id: swim.id, distance: 2) ]
)
Event::Participant.create! event: event1, user: user1
Event::Creator.create! event: event1, user: user1
Event::Admin.create! event: event1, user: user2
events.push( event1 )

#print all event ids
puts "Event IDs:"
events.each do |event|
    puts (event.id)
end


puts ("seed completed - view development.sqlite3 by uploading on https://sqliteonline.com/")