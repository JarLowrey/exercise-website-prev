json.extract! activity, :id, :name, :cost, :instructions, :start, :end, :created_at, :updated_at
json.url activity_url(activity, format: :json)
