# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

#Create Exercises
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

#Create users
user1 = User.create! email: "user1@example.com", password: "12345678", first_name: "James", last_name: "Lowrey"


#create events
events = []

event1_addr = Address.create! address: "Columbus OH USA", latitude: 1, longitude: 1
event1 = Event.create! name: "Test", description: "Testing event in DB", address: event1_addr
Event::Participant.create! event: event1, user: user1
Event::Organizer.create! event: event1, user: user1
events.push( event1 )

#print all event ids
puts "Event IDs:"
events.each do |event|
    puts (event.id)
end


puts ("seed completed - view development.sqlite3 by uploading on https://sqliteonline.com/")