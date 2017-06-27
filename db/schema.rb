# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170624214956) do

  create_table "attendees", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.boolean "verified"
    t.index ["event_id"], name: "index_attendees_on_event_id"
    t.index ["user_id"], name: "index_attendees_on_user_id"
  end

  create_table "coaches", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.index ["event_id"], name: "index_coaches_on_event_id"
    t.index ["user_id"], name: "index_coaches_on_user_id"
  end

  create_table "event_gear", force: :cascade do |t|
    t.integer "event_id"
    t.boolean "mandatory"
    t.decimal "cost", precision: 8, scale: 2, null: false
    t.index ["event_id"], name: "index_event_gear_on_event_id"
  end

  create_table "event_organizers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.index ["event_id"], name: "index_event_organizers_on_event_id"
    t.index ["user_id"], name: "index_event_organizers_on_user_id"
  end

  create_table "event_reviews", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.integer "rating", null: false
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_reviews_on_event_id"
    t.index ["user_id"], name: "index_event_reviews_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.decimal "cost", precision: 8, scale: 2, null: false
    t.string "name", null: false
    t.text "description", null: false
    t.integer "min_users"
    t.integer "max_users"
    t.datetime "start_time"
    t.string "recurring"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exercise_instances", force: :cascade do |t|
    t.float "duration", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "distance"
    t.float "#<ActiveRecord::ConnectionAdapters::SQLite3::TableDefinition:0x000000056149a0>"
  end

  create_table "exercise_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "icon_url"
    t.boolean "verified", null: false
  end

  create_table "gear_types", force: :cascade do |t|
    t.string "name", null: false
    t.string "url"
  end

  create_table "group_admins", force: :cascade do |t|
    t.integer "user_id"
    t.integer "group_id"
    t.index ["group_id"], name: "index_group_admins_on_group_id"
    t.index ["user_id"], name: "index_group_admins_on_user_id"
  end

  create_table "group_types", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "verified", null: false
  end

  create_table "groups", force: :cascade do |t|
  end

  create_table "locations", force: :cascade do |t|
    t.string "zip"
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "country"
    t.decimal "lat", precision: 10, scale: 6, null: false
    t.decimal "lng", precision: 10, scale: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer "age"
    t.decimal "weight", precision: 4, scale: 1
    t.decimal "height", precision: 4, scale: 2
    t.string "first_name"
    t.string "last_name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
