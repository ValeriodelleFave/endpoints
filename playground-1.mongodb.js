
use('budget_management');


db.getCollection('budget')
  .aggregate(
    {},
    {
      $group: {}
    }
  )
  .sort({});
