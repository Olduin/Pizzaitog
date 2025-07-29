const uri = "/api/pizza/";
function generatePizzaCards(pizzas) {
    const container = $(".Page-container");
    const containerFlex = $(".my-flex-container");
    const AddButtonHtml = `<a class="button-link-Create">Добавить пиццу</a>`;
    container.empty();

    pizzas.forEach(pizza => {
        const cardHtml = `
                <div class="flex-card">
                    <img class="card-img" data-id="${pizza.id}" src="${pizza.image}">
                    <a class="card-name" href="Details/${pizza.id}" >${pizza.name}</a>
                    <div class="card-ingredients">${pizza.ingredients}</div>
                    <div class="card-footer">
                        <div class="card-price">${pizza.price} &#8381;</div>
                        <div class="card-weight">${pizza.weight} гр.</div>
                        <a href="#" class="button-link">В корзину</a>
                        <a data-id="${pizza.id}" class="button-link-Edit">Изменить</a>
                        <a data-id="${pizza.id}" class="button-link-Delete">Удалить</a>
                    </div>
                </div>
            `;
        containerFlex.append(cardHtml);

    });
    container.append(AddButtonHtml);
    container.append(containerFlex);

    $('.card-img').on('click', function () {
        var pizzaId = ($(this).data('id'));
        $.ajax({
            url: uri + pizzaId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                generatePizzaDetail(data);

            },
            error: function () {
                console.error("Ошибка при получении одной пиццы");
            }
        })
    });

    $('.button-link-Create').on('click', function () {
        openModal();
    });

    $('.button-link-Edit').on('click', function () {
        const pizzaId = $(this).data('id');
        $.ajax({
            url: uri + pizzaId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                openModal(data);
            },
            error: function () {
                alert("Ошибка при загрузке пиццы");
            }
        });
    });

    $('.button-link-Delete').on('click', function (e) {
        var pizzaId = $(this).data('id');
        let IsDelete = confirm("Удалить элемент?");
        if (IsDelete == true) {
            $.ajax({
                url: uri + pizzaId,
                type: "DELETE",
                data: { id: pizzaId },
                success: function (data) {
                    location.reload(true);
                },

            })
        }
    })

    $('.button-link-Edit').on('click', function () {
        var pizzaId = $(this).data('id');
        $.ajax({
            url: uri + pizzaId,
            type: "PUT",
            dataType: "json",
            success: function (data) {
                generatePizzaEdit(data);
            },
            error: function () {
                console.error("Ошибка при получении одной пиццы");
            }
        })
    });
};

$.ajax({
    url: "/api/pizza",
    type: "GET",
    dataType: "json",
    success: function (data) {
        generatePizzaCards(data);
    },
    error: function () {
        console.error("Ошибка при получении списка пицц");
    }
});

function generatePizzaDetail(pizza) {
    const container = $(".Page-container");
    container.empty();

    const cardHtml = `
            <div class="pizza-details-card">
                <button id="back-to-list" class="btn btn-outline-primary">
                    &#8592; Назад
                </button>
                <img class="card-img" src="${pizza.image}">
                <h4 class="pizza-title">${pizza.name}</h4>
                <div class="pizza-ingredient"> ${pizza.ingredients} </div>
                <div class="card-footer">
                    <div class="card-price">${pizza.price} &#8381;</div>
                    <div class="card-weight">${pizza.weight} гр.</div>
                    <a href="#" class="button-link">В корзину</a>
                </div>
            </div>
        `;

    container.append(cardHtml);

    $('#back-to-list').on('click', function () {
        //$.ajax({
        //    url: uri,
        //    type: "GET",
        //    dataType: "json",
        //    success: function (data) {
        //        generatePizzaCards(data);
        //    },
        //    error: function () {
        //        console.error("Ошибка при получении списка пицц");
        //    }
        //});
        location.reload();
    });
};

$('#pizza-form').on('submit', function (e) {
    e.preventDefault();

    const pizza = {
        name: $('#pizza-name').val(),
        image: $('#pizza-image').val(),
        ingredients: $('#pizza-ingredients').val(),
        price: parseFloat($('#pizza-price').val()),
        weight: parseFloat($('#pizza-weight').val())
    };

    const id = $('#pizza-id').val();

    if (id) {
        // редактирование
        $.ajax({
            url: uri + id,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({ id, ...pizza }),
            success: function () {
                closeModal();
                location.reload();
            },
            error: () => alert("Ошибка при обновлении пиццы")
        });
    } else {
        // создание
        $.ajax({
            url: uri,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(pizza),
            success: function () {
                closeModal();
                location.reload();
            },
            error: () => alert("Ошибка при создании пиццы")
        });
    }
});

const pizzaModal = new bootstrap.Modal(document.getElementById('pizzaModal'));

function openModal(pizza = null) {
    if (pizza) {
        $('#pizzaModalLabel').text("Редактировать пиццу");
        $('#pizza-id').val(pizza.id);
        $('#pizza-name').val(pizza.name);
        $('#pizza-image').val(pizza.image);
        $('#pizza-ingredients').val(pizza.ingredients);
        $('#pizza-price').val(pizza.price);
        $('#pizza-weight').val(pizza.weight);
    } else {
        $('#pizzaModalLabel').text("Добавить пиццу");
        $('#pizza-form')[0].reset();
        $('#pizza-id').val('');
    }
    pizzaModal.show();
}

function closeModal() {
    pizzaModal.hide();
}

