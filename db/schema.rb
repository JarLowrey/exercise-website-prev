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

ActiveRecord::Schema.define(version: 20170630153123) do

  create_table "addresses", force: :cascade do |t|
    t.string "address"
    t.decimal "latitude", precision: 10, scale: 6, null: false
    t.decimal "longitude", precision: 10, scale: 6, null: false
    t.string "addressable_id"
    t.string "addressable_type"
    t.index ["addressable_id"], name: "index_addresses_on_addressable_id"
    t.index ["addressable_type"], name: "index_addresses_on_addressable_type"
    t.index ["latitude"], name: "index_addresses_on_latitude"
    t.index ["longitude"], name: "index_addresses_on_longitude"
  end

  create_table "event_coaches", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.index ["event_id"], name: "index_event_coaches_on_event_id"
    t.index ["user_id"], name: "index_event_coaches_on_user_id"
  end

  create_table "event_gear", force: :cascade do |t|
    t.integer "event_id"
    t.boolean "mandatory"
    t.index ["event_id"], name: "index_event_gear_on_event_id"
  end

  create_table "event_organizers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.index ["event_id"], name: "index_event_organizers_on_event_id"
    t.index ["user_id"], name: "index_event_organizers_on_user_id"
  end

  create_table "event_participants", force: :cascade do |t|
    t.integer "user_id"
    t.integer "event_id"
    t.index ["event_id"], name: "index_event_participants_on_event_id"
    t.index ["user_id"], name: "index_event_participants_on_user_id"
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

  create_table "events", id: false, force: :cascade do |t|
    t.string "id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.integer "min_users"
    t.integer "max_users"
    t.datetime "start_time"
    t.string "recurring"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_events_on_id"
  end

  create_table "exercise_instances", force: :cascade do |t|
    t.float "duration", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "distance"
    t.float "#<ActiveRecord::ConnectionAdapters::SQLite3::TableDefinition:0x00000004ba2a58>"
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

  create_table "group_types", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "verified", null: false
  end

  create_table "groups", force: :cascade do |t|
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
