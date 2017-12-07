// These plans are already in Stripe, these are here for documentation on spelling of the plans

var twentyFivePlan = stripe.plans.create({
  name: "25",
  id: "25-monthly",
  interval: "month",
  currency: "usd",
  amount: 2500,
  statement_descriptor: "New Story Charity",
});

var fiftyPlan = stripe.plans.create({
  name: "50",
  id: "50-monthly",
  interval: "month",
  currency: "usd",
  amount: 5000,
  statement_descriptor: "New Story Charity"
});

var hundredPlan = stripe.plans.create({
  name: "100",
  id: "100-monthly",
  interval: "month",
  currency: "usd",
  amount: 10000,
  statement_descriptor: "New Story Charity"
});

var tenPlan = stripe.plans.create({
  name: "10",
  id: "10-monthly",
  interval: "month",
  currency: "usd",
  amount: 100,
  statement_descriptor: "New Story Charity",
});

var twoHundredFiftyPlan = stripe.plans.create({
  name: "250",
  id: "250-monthly",
  interval: "month",
  currency: "usd",
  amount: 25000,
  statement_descriptor: "New Story Charity"
});

var fiveHundredPlan = stripe.plans.create({
  name: "100",
  id: "100-monthly",
  interval: "month",
  currency: "usd",
  amount: 50000,
  statement_descriptor: "New Story Charity"
});

var oneThousandPlan = stripe.plans.create({
  name: "1000",
  id: "1000-monthly",
  interval: "month",
  currency: "usd",
  amount: 100000,
  statement_descriptor: "New Story Charity"
});