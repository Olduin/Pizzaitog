//const { read } = require("@popperjs/core");

const uri = "/api/pizza/";
const pizzaEditModal = new bootstrap.Modal(document.getElementById('pizzaEditModal'));
const pizzaDetailModal = new bootstrap.Modal(document.getElementById('pizzaDetailModal'));
const mySpinner = document.getElementById('pizzaLoader');
const dropZone = document.getElementById('drop-zone');
const fileImage = document.getElementById('pizza-image');
const prevImage = document.getElementById('prevImage');
const CheckNotImage = document.getElementById('CheckNotImage');
const zaglushka = "/images/no-image.png";

function handleImageError(img) {
    img.src = zaglushka;
}

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
        //if (pizza.image == null) {
        //    pizza.image = zaglushka;
        //}

        const cardHtml = `
                <div class="flex-card" id="card1" data-id="card-${pizza.id}">
                    <div class="card-img-container">
                        <img class="card-img" data-id="${pizza.id}" src="${pizza.image}" onerror="handleImageError(this)" alt="Не удалось загрузить">
                    </div>                    
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

            //closePizzaLoader();
            generatePizzaCards(data);
        },
        error: function () {
            //closePizzaLoader();
            console.error("Ошибка при получении списка пицц");
        }
    });
}

(function () {
    PizzasGetAll();
})();

function generatePizzaDetail(pizza) {
    //if (pizza.image == null) {
    //    pizza.image = zaglushka;
    //}
    const container = $(".Page-container");
    const flexContainer = $(".my-flex-container")
    container.empty();

    const cardHtml = `
            <div class="pizza-details-card"  data-id="${pizza.id}">
                <button id="back-to-list" class="btn btn-outline-primary">
                    &#8592; Назад
                </button>
                <img class="card-img" src="${pizza.image}" onerror="handleImageError(this)" alt="Карточка товара">
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

$(pageContainer).on('click', '#back-to-list', function () {
    PizzasGetAll();
});

function openEditModal(pizza = null) {
    if (pizza) {
        if (pizza.image) {
            prevImage.src = pizza.image;
        } else {
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
    //$(CheckNotImage).prop("checked", false);
    $("#editImage").toggle(display = true)
}

function closeEditModal() {
    pizzaEditModal.hide();
}

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
    if (CheckNotImage.checked) {
        formData.append("NoImage", true);
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
            //closePizzaLoader();
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

$(".Page-container").on('click', '.card-name', function () {
    var pizzaId = ($(this).data('id'));
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            //closePizzaLoader();
            openDetailModal(data);

        },
        error: function () {
            console.error("Ошибка при получении одной пиццы");
        }
    })
});

//События
$(CheckNotImage).on("change",function () {
    $("#editImage").toggle(!this.checked)
    //$("#editImage").
});

$(".Page-container").on('click', '.button-link-Create', function () {
    openEditModal();
});

$(".Page-container").on('click', '.button-link-Edit', function () {
    const pizzaId = $(this).data('id');
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            //closePizzaLoader();
            openEditModal(data);
        },
        error: function () {
            alert("Ошибка при загрузке пиццы");
        }
    });
});

$(".Page-container").on('click', '.button-link-Delete', function (e) {
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
                //closePizzaLoader();
                elemToDel.remove();
            },
        })
    }
});

$(".Page-container").on('click', '.card-img', function () {
    var pizzaId = ($(this).data('id'));
    $.ajax({
        url: uri + pizzaId,
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            openPizzaLoader();
        },
        success: function (data) {
            //closePizzaLoader();
            generatePizzaDetail(data);

        },
        error: function () {
            console.error("Ошибка при получении одной пиццы");
        }
    })
})

$(".modals-window").on('change', '#pizza-image', function () {
    readURL(this);
})

//$(document).on('click', "#btn-reset", function () {
//    // fileImage.replaceWith(fileImage.val('').clone(true));
//   // fileImage.files = new DataTransfer().files;
//})

$(document).ajaxStart(function () {
    $(".preloader").fadeIn(200);
});

$(document).ajaxStop(function () {
    $(".preloader").fadeOut(200);
});



//$(".modals-window").ready(function () {
//    const dropZone = $("#drop-zone");
//    const fileInput = $("#pizza-image");
//    const previewImage = $("#prevImage");

//    // Клик по зоне = открытие диалога выбора
//    dropZone.on("click", function () {
//        fileInput.click();
//    })

//    // Отображение превью при выборе файла
//    fileInput.on("change", (e) => handleFile(e.target.files[0]));

//    dropZone.on("dragover", function (e) {
//        e.preventDefault();
//        dropZone.addClass("dragover");
//    });

//    dropZone.on("dragleave", function () {
//        dropZone.removeClass("dragover");
//    });

//    dropZone.on("drop", function (e) {
//        e.preventDefault();
//        dropZone.removeClass("dragover");

//        const file = e.originalEvent.dataTransfer.files[0];
//        if (file) {
//            fileInput[0].files = e.originalEvent.dataTransfer.files;
//            handleFile(file);
//        }
//    });

//    function handleFile(file) {
//        if (!file.type.startsWith("image/")) return;

//        const reader = new FileReader();
//        reader.onload = (e) => {
//            previewImage.attr("src", e.target.result).removeClass("d-none");
//        };
//        reader.readAsDataURL(file);
//    }

//    // Отправка формы создания/обновления
//    $("#save-pizza-btn").on("click", function () {
//        const form = document.getElementById("pizza-form");
//        const formData = new FormData(form);
//        const id = $("#pizza-id").val();
//        const isUpdate = id !== "";

//        const url = isUpdate ? `/Pizza/${id}` : "/Pizza/PizzaCreate";
//        const method = isUpdate ? "PUT" : "POST";

//        $.ajax({
//            url: url,
//            method: method,
//            data: formData,
//            processData: false,
//            contentType: false,
//            success: function () {
//                $("#pizzaModal").modal("hide");
//                loadPizzaList(); // функция для обновления списка
//            },
//            error: function () {
//                alert("Ошибка при сохранении пиццы");
//            }
//        });
//    });
//});