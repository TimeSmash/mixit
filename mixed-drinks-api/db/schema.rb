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

ActiveRecord::Schema.define(version: 2019_12_12_042510) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "drinks", force: :cascade do |t|
    t.string "name"
    t.string "alcohols"
    t.string "flavors"
    t.string "types"
    t.string "color"
    t.string "picture_url"
    t.string "picture_credit"
    t.string "recipe"
    t.string "recipe_url"
    t.string "additional_notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_drinks", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "drink_id"
    t.boolean "favorited"
    t.boolean "made"
    t.boolean "interested"
    t.boolean "reviewed"
    t.string "review_content"
    t.integer "review_stars"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["drink_id"], name: "index_user_drinks_on_drink_id"
    t.index ["user_id"], name: "index_user_drinks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.date "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
  end

  add_foreign_key "user_drinks", "drinks"
  add_foreign_key "user_drinks", "users"
end
