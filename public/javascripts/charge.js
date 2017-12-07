var checkoutHandler = StripeCheckout.configure({
    key: "pk_test_xccDXirNQNMdCwM6kRdzqDnr",
    locale: "auto"
});
  
  var button25 = document.getElementById("buttonCheckout25");
  var button50 = document.getElementById("buttonCheckout50");
  var button100 = document.getElementById("buttonCheckout100");
  var button10 = document.getElementById("buttonCheckout10");
  var button250 = document.getElementById("buttonCheckout250");
  var button500 = document.getElementById("buttonCheckout500");
  var button1000 = document.getElementById("buttonCheckout1000");

  function checkout(dollarAmount) {
    checkoutHandler.open({
      name: "New Story",
      amount: dollarAmount,
      description: "Built with Friends!",
      billingAddress: true,
      shippingAddress: true,
      token: handleToken
    });
  }

  function checkoutStarted(dollarAmount) {
    checkoutHandler.open({
      name: "New Story",
      amount: dollarAmount,
      description: "Donate $25/month",
      billingAddress: true,
      shippingAddress: true,
      token: handleToken
    });
  }

  var route = "";

  button10.addEventListener("click", function(ev) {
    checkout(1000);
    route = "/charge/tier1"
  });

  button25.addEventListener("click", function(ev) {
    checkout(2500);
    route = "/charge/tier2"
  });

  button50.addEventListener("click", function(ev) {
    checkout(5000);
    route = "/charge/tier3"
  });

  button100.addEventListener("click", function(ev) {
    checkout(10000);
    route = "/charge/tier4"
  });

  button250.addEventListener("click", function(ev) {
    checkout(25000);
    route = "/charge/tier5"
  });

  button500.addEventListener("click", function(ev) {
    checkout(50000);
    route = "/charge/tier6"
  });

  button1000.addEventListener("click", function(ev) {
    checkout(100000);
    route = "/charge/tier7"
  });

  function handleToken(token) {
    fetch(route + "?orig=" + window.location.pathname.split("/")[window.location.pathname.split("/").length - 1], {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(token)
    })
    .then(output => {
      if (output.status === "succeeded")
        console.log("success!");
        // window.location HERE
        location.replace('https://newstorycharity.org/home-monthly-thank-you/');
    })
  }
