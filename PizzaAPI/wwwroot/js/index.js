//const { read } = require("@popperjs/core");

const uri = "/api/pizza/";
const pizzaEditModal = new bootstrap.Modal(document.getElementById('pizzaEditModal'));
const pizzaDetailModal = new bootstrap.Modal(document.getElementById('pizzaDetailModal'));
const mySpinner = document.getElementById('pizzaLoader');
const dropZone = document.getElementById('drop-zone');
const fileImage = document.getElementById('pizza-image');
const prevImage = document.getElementById('prevImage');
const zaglushka = "/images/zaglushka_1.jpg"

function generatePizzaCards(pizzas) {
    const pageContainer = $(".Page-container");
    pageContainer.empty();
    const AddCardsHtml = `
        <a class="button-link-Create">Добавить пиццу</a>
        <div class="my-flex-container"></div>
    `;
    pageContainer.append(AddCardsHtml);
    const flexContainer = $(".my-flex-container");       
    
    pizzas.forEach(pizza => {
        if (pizza.image == null) {
            pizza.image = zaglushka;
        }

        const cardHtml = `
                <div class="flex-card" id="card1" data-id="card-${pizza.id}">
                    <img class="card-img" data-id="${pizza.id}" src="${pizza.image}" alt="Не удалось загрузить">
                    <a class="card-name" id="card-name" data-id="${pizza.id}" >${pizza.name}</a>
                    <div class="card-ingredients">${pizza.ingredients}</div>
                    <div class="card-footer">
                        <div class="card-price">${pizza.price} &#8381;</div>
                        <div class="card-weight">${pizza.weight} гр.</div>
                        <a data-id="${pizza.id}" class="button-link-Edit">Изменить</a>
                        <a data-id="${pizza.id}" class="button-link-Delete">Удалить</a>
                    </div>
                </div>
            `;
        flexContainer.append(cardHtml);
    });    
    pageContainer.append(flexContainer);   
};

function PizzasGetAll() {
    $.ajax({
        url: "/api/pizza",
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {

            closePizzaLoader();
            generatePizzaCards(data);
        },
        error: function () {
            closePizzaLoader();
            console.error("Ошибка при получении списка пицц");
        }
    });
}

(function () {
    PizzasGetAll();
})();

function generatePizzaDetail(pizza) {
    if (pizza.image == null) {
        pizza.image = "/images/cagliari_1.jpg"
    }
    const container = $(".Page-container");
    const flexContainer = $(".my-flex-container")
    container.empty();

    const cardHtml = `
            <div class="pizza-details-card" data-id="${pizza.id}">
                <button id="back-to-list" class="btn btn-outline-primary">
                    &#8592; Назад
                </button>
                <img class="card-img" src="${pizza.image}">
                <h4 class="pizza-title">${pizza.name}</h4>
                <div class="pizza-ingredient"> ${pizza.ingredients} </div>
                <div class="card-footer">
                    <div class="card-price">${pizza.price} &#8381;</div>
                    <div class="card-weight">${pizza.weight} гр.</div>
                </div>
            </div>
        `;

    container.append(cardHtml);

    //$('#back-to-list').on('click', function () {   
    //    PizzasGetAll();
    //    //location.reload();
    //});
};

function openDetailModal(pizza) {
    $('#pizzaDetailModalLabel').text(pizza.name);
    $('#pizza-detail-image').attr("src", pizza.image);
    $('#pizza-detail-name').text(pizza.name);
    $('#pizza-detail-ingredient').text(pizza.ingredients);
    $('#pizza-detail-weight').text(pizza.weight + ' гр.');  
    $('#pizza-detail-price').text(pizza.price + ' ₽');

    //const container = $(".detail-modal");
    //container.empty();
    //const cardHtml = `                           
    //            <img class="card-img" src="${pizza.image}">
    //            <h4 class="pizza-title">${pizza.name}</h4>
    //            <div class="pizza-ingredient"> ${pizza.ingredients} </div>
    //            <div class="card-footer">
    //                <div class="card-price">${pizza.price} &#8381;</div>
    //                <div class="card-weight">${pizza.weight} гр.</div>
    //            </div>         
    //    `;

    //container.append(cardHtml);
    pizzaDetailModal.show();
}

function closeDetailModal() {
    pizzaEditModal.hide();
}

$(document).on('click', '#back-to-list', function () {
    PizzasGetAll();
});

function openEditModal(pizza = null) {
    if (pizza) {
        if (pizza.image) {
            prevImage.src = pizza.image;
        }else {
            prevImage.src = zaglushka;
        }

        $('#pizza-form')[0].reset();
        $('#pizzaEditModalLabel').text("Редактировать пиццу");
        $('#pizza-id').val(pizza.id);
        $('#pizza-name').val(pizza.name);            
        //prevImage.src = pizza.image;
        $('#pizza-ingredients').val(pizza.ingredients);
        $('#pizza-price').val(pizza.price);
        $('#pizza-weight').val(pizza.weight);
    } else {
        $('#pizzaEditModalLabel').text("Добавить пиццу");
        $('#pizza-form')[0].reset();
        $('#pizza-id').val('');
        prevImage.src = zaglushka;
    }
    pizzaEditModal.show();
}

function closeEditModal() {
    pizzaEditModal.hide();
}


//$('#pizza-form').on('submit', function (e) {
//    e.preventDefault();


//    const pizza = {
//        name: $('#pizza-name').val(),
//        image: $('#pizza-image').val(),
//        ingredients: $('#pizza-ingredients').val(),
//        price: parseInt($('#pizza-price').val()),
//        weight: parseInt($('#pizza-weight').val())
//    };


//    pizzaData = new FormData($('pizza-form')[0]);
//    //pizzaData.append("Id", parseInt($("#pizza-id").val()));
//    pizzaData.append("Name", $("#pizza-name").val());
//    pizzaData.append("Image", fileImage.files[0]);
//    pizzaData.append("Ingredients", $("#pizza-ingredients").val());
//    pizzaData.append("Weight", parseInt($('#pizza-weight').val()));
//    pizzaData.append("Price", parseInt($('#pizza-weight').val()));

//    const id = $('#pizza-id').val();

//    if (id) {
//        $.ajax({
//            url: uri + id,
//            type: "PUT",
//            contentType: false,
//            processData: false,
//            data: { id, pizzaData },
//            dataType: 'JSON',
//            //data: JSON.stringify({ id, ...pizza }),
//            beforeSend: function () {
//                openPizzaLoader();
//            },
//            success: function () {
//                closePizzaLoader();
//                closeEditModal();
//                PizzasGetAll();
//            },
//            error: () => alert("Ошибка при обновлении пиццы")
//        });
//    } else {
//        $.ajax({
//            url: uri,
//            type: "POST",
//            // data: JSON.stringify(pizza),
//            contentType: false,
//            processData: false,
//            data: pizzaData,
//            dataType: 'JSON',
//            beforeSend: function () {
//                openPizzaLoader();
//            },
//            success: function () {
//                closePizzaLoader();
//                closeEditModal();
//                PizzasGetAll();
//            },
//            error: () => alert("Ошибка при создании пиццы")

//        });
//    }
//});

$('#pizza-form').on('submit', function (e) {
    e.preventDefault();

    const id = $('#pizza-id').val();
    const isEdit = !!id;

    const form = $('#pizza-form')[0];
    const formData = new FormData(form);

    //formData = LoadFormData();

    if (isEdit) {
        formData.append("Id", id);
    }

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? uri + id : uri;

    $.ajax({
        url: url,
        type: method,
        contentType: false,
        processData: false,
        data: formData,
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function () {
            closePizzaLoader();
            closeEditModal();
            PizzasGetAll();
        },
        error: () => alert("Ошибка при сохранении пиццы")
    });
          
});

//function LoadFormData(files = null) {

//    const form = $('#pizza-form')[0];
//    const formData = new FormData(form);

//    if (files) {
//        formData.set("Image", files[0]);
//    }         

//    return formData;
//}

function closePizzaLoader() {
    $("#pizzaLoader").hide();
}
function openPizzaLoader() {
    $("#pizzaLoader").show();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onloadend = function (e) {
            $('#prevImage').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on('click', '.card-name', function () {
    var pizzaId = ($(this).data('id'));
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            closePizzaLoader();
            openDetailModal(data);

        },
        error: function () {
            console.error("Ошибка при получении одной пиццы");
        }
    })
});

//События

$(document).on('click', '.button-link-Create', function () {
    openEditModal();
});

$(document).on('click', '.button-link-Edit', function () {
    const pizzaId = $(this).data('id');
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            closePizzaLoader();
            openEditModal(data);
        },
        error: function () {
            alert("Ошибка при загрузке пиццы");
        }
    });
});

$(document).on('click', '.button-link-Delete', function (e) {
    var pizzaId = $(this).data('id');
    var elemToDel = this.closest('.flex-card');
    let IsDelete = confirm("Удалить элемент?");
    if (IsDelete == true) {
        $.ajax({
            url: uri + pizzaId,
            type: "DELETE",
            data: { id: pizzaId },
            beforeSend: function () {
                openPizzaLoader();
            },
            success: function (data) {
                closePizzaLoader();
                elemToDel.remove();
            },
        })
    }
});

$(document).on('click', '.card-img', function () {
    var pizzaId = ($(this).data('id'));
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            closePizzaLoader();
            generatePizzaDetail(data);

        },
        error: function () {
            console.error("Ошибка при получении одной пиццы");
        }
    })
})

$(document).on('change', '#pizza-image', function () {
    readURL(this);
})


//drag-and-drop

//const dropZone = document.getElementById('drop-zone');
//const fileImage = document.getElementById('pizza-image');
//const prevImage = document.getElementById('prevImage');


//var dropArea = $('#drag-zone');

//// Prevent default drag behaviors
//$(document).on('dragenter dragover dragleave drop', function (e) {
//    e.preventDefault();
//    e.stopPropagation();
//});

//// Highlight drop area on dragenter/dragover
//dropArea.on('dragenter dragover', function () {
//    dropArea.addClass('highlight');
//});

//// Remove highlight on dragleave/drop
//dropArea.on('dragleave drop', function () {
//    dropArea.removeClass('highlight');
//});

//// Handle dropped files
//dropArea.on('drop', function (e) {
//    //const form = $('#pizza-form')[0];
//    //const formData = new FormData(form);
//    var files = e.originalEvent.dataTransfer.files;
//    ////handleFiles(files);
//    //formData.set('Image', files[0] )
//    //this.formData.set('Image', files[0]);
//    //LoadFormData(files)
//    fileImage.files[0] = files[0];
//    readURL(files);
//});


