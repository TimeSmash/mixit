class DrinkSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :alcohols, :flavors, :id, :types, :color, :picture_url, :picture_credit, :recipe, :recipe_url, :additional_notes
end
