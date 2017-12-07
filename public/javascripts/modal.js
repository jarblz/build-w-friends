// var checkoutHandler = StripeCheckout.configure({
//   key: "pk_test_xccDXirNQNMdCwM6kRdzqDnr",
//   locale: "auto"
// });



// $('.btn-primary').click(function() {
//   function checkout(dollarAmount) {
//     checkoutHandler.open({
//       name: "New Story",
//       amount: dollarAmount,
//       description: "Built with Friends!",
//       billingAddress: true,
//       shippingAddress: true,
//       token: handleToken
//     });
//   }
//   var amount = $('#amount').val();
//   if (amount < 5) {
//     console.log("That is not enough");
//     return
//   }
//   function handleToken(token) {
//     fetch(route, {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(token)
//     })
//     .then(output => {
//       if (output.status === "succeeded")
//         console.log("success!");
//     })
//   }
//   return () => {checkout(amount*100); route = "/charge/tier1";};
// });

// $('#buttonCheckoutOther').click(function () {
//   return $('.panel').addClass("activate-modal");
// });

// $('.btn-close').click(function() {
//   return $('.panel').fadeOut(function() {
//     return $('.panel').removeClass("activate-modal");
//   });
// });

$('#buttonCheckoutOther').click(function() {
  return $('#secondPanel').toggle();
})

$('.max-get-started').click(function () {
  return document.getElementById('gettingStartedLink').scrollIntoView();
});