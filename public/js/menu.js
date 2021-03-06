$(document).ready(() => {
  $(document).prop("title", "Create Your Menu!");
  $.get("/api/user_data").then(data => {
    console.log(data);
    $(".member-name").text(data.email);
  });
  $.get("/api/restaurants/3").then(data => {
    restaurant = data;
    console.log(data);
    $(".restaurantName").text(data.name + " ");
    $(".phoneNumber").text(data.phone);
    $(".address").text(data.address);
    $(".hours").text(data.hours);
    renderMenu(data.Menus);
  });
  // Getting references to our form and input for menu items
  const itemName = $("input#itemName");
  const itemDescription = $("input#itemDescription");
  const itemPrice = $("input#itemPrice");

  $("#tequilabtn").on("click", event => {
    event.preventDefault();
    const menuItem = {
      item: itemName.val().trim(),
      description: itemDescription.val().trim(),
      price: itemPrice.val().trim()
      // RestaurantId: restaurant.id
    };
    console.log(menuItem);
    // run submitItem to create a new Menu item
    submitItem(menuItem);
  });

  function submitItem(item) {
    $.post("/api/menu", item).then(data => {
      $(".menu").append(
        `<div><p>item - ${item.item} description - ${item.description} price - ${item.price}</p></div><button class="edit">Edit</button> <button class="delete" item-id="${data.id}">Delete</button>`
      );
      location.reload();
    });
  }

  function renderMenu(arr) {
    arr.forEach(item => {
      $(".menu").append(
        `<div><p>item - ${item.item} description - ${item.description} price - ${item.price}</p></div><button class="edit">Edit</button> <button class="delete" item-id="${item.id}">Delete</button>`
      );
    });
  }

  $(".menu").on("click", ".delete", function() {
    $.ajax({
      method: "DELETE",
      url: "/api/menu/" + $(this).attr("item-id")
    }).then(() => console.log("deleted!"));
  });

  $(".menu").on("click", ".edit", event => {
    event.preventDefault();
    const menuItem = {
      item: itemName.val().trim(),
      description: itemDescription.val().trim(),
      price: itemPrice.val().trim()
    };
    editItem(menuItem);
  });

  function editItem() {
    $.ajax({
      method: "PUT",
      url: "/api/menu/" + $(this).attr("item-id")
    }).then(() => console.log("edited!"));
  }
});
