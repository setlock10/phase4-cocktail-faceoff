class UserDrinkRatingSerializer < ActiveModel::Serializer
  attributes :userdrinkname, :rating

  def userdrinkname

    self.drink.strDrink

  end
end
