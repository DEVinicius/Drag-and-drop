document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener('dragover', e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone--over");
        })
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();
        if(e.dataTransfer.files.length)
        {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

function updateThumbnail(dropZoneElement, file)
{
    let thumnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    if(dropZoneElement.querySelector(".drop-zone__prompt"))
    {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    if(!thumnailElement)
    {
        thumnailElement = document.createElement("div");
        thumnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumnailElement);
    }

    thumnailElement.dataset.label = file.name;

    if(file.type.startsWith("image/"))
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumnailElement.style.backgroundImage = `url('${reader.result}')`;
        }
    }
    else
    {
        thumnailElement.style.backgroundImage = null;
    }
}

// const myForm = document.getElementById("myForm");

// myForm.addEventListener("submit", e => {
//     const file = document.getElementById("file");
//     const name = document.getElementById("inputNome");
//     e.preventDefault();

//     const endpoint = "anuncios/create";
//     const data = JSON.stringify({"file":file.files[0], "name":name.value})

//     console.log(typeof(data));
//     fetch(endpoint, {
//         method: "post",
//         body: data
//     }).catch(
//         console.error
//     )
// });