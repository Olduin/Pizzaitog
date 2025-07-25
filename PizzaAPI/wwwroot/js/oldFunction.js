
//function generatePizzaEdit(pizza) {
//    const container = $(".Page-container");
//    container.empty();

//    const editFormHtml = `
//        <form method="put" class="pizza-form">
//            <div class="form-group">
//                <label asp-for="Name"></label>
//                <input asp-for="Name" class="form-control" />
//                <span asp-validation-for="Name" class="text-danger"></span>
//            </div>

//            <div class="form-group">
//                <label asp-for="Image"></label>
//                <input asp-for="Image" class="form-control" />
//                <span asp-validation-for="Image" class="text-danger"></span>
//            </div>

//            <div class="form-group">
//                <label asp-for="Ingredients"></label>
//                <input asp-for="Ingredients" class="form-control" />
//                <span asp-validation-for="Ingredients" class="text-danger"></span>
//            </div>

//            <div class="form-group">
//                <label asp-for="Price"></label>
//                <input asp-for="Price" class="form-control" />
//                <span asp-validation-for="Price" class="text-danger"></span>
//            </div>

//            <div class="form-group">
//                <label asp-for="Weight"></label>
//                <input asp-for="Weight" class="form-control" />
//                <span asp-validation-for="Weight" class="text-danger"></span>
//            </div>

//            <button type="submit" class="btn-submit">Сохранить</button>
//        </form>
//    `;
//}

//$('.card-img').on('click', function () {
//    var pizzaId = $(this).data('id');
//    if (pizzaId) {
//        const cardHtml = `

//    <div class="pizza-details-card">
//        <img class="card-img" src="${pizzaId.Image}">
//        <h4 class="pizza-title">${pizzaId.Name}</h4>
//        <div class="pizza-ingredient"> ${pizzaId.Ingredients} </div>
//        <div class="card-footer">
//            <div class="card-price">${pizzaId.Price} &#8381;</div>
//            <div class="card-weight">${pizzaId.Weight} гр.</div>
//            <a href="#" class="button-link">В корзину</a>
//        </div>
//    </div>
//    `;
//        var url = 'Details/' + encodeURIComponent(pizzaId);

//        location.href = url;
//    }

//$('.button-link-Edit').on('click', function () {
//    var pizzaId = $(this).data('id');
//    $.ajax({
//        url: "/api/pizza/" + pizzaId,
//        type: "",
//        dataType: "json",
//        success: function (data) {
//            generatePizzaEdit(data);
//        },
//        error: function () {
//            console.error("Ошибка при получении одной пиццы");
//        }
//    })
//});