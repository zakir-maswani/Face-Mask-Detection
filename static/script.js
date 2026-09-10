const imageInput = document.getElementById("imageInput");

const preview = document.getElementById("preview");

const previewContainer =
    document.getElementById("previewContainer");

const predictBtn =
    document.getElementById("predictBtn");

const loading =
    document.getElementById("loading");

const result =
    document.getElementById("result");

const prediction =
    document.getElementById("prediction");

const confidence =
    document.getElementById("confidence");


imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    const imageURL =
        URL.createObjectURL(file);

    preview.src = imageURL;

    previewContainer.classList.remove("hidden");

    predictBtn.disabled = false;


    result.classList.add("hidden");

});

predictBtn.addEventListener("click", async function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }


    const formData = new FormData();

    formData.append("file", file);


    predictBtn.disabled = true;

    loading.classList.remove("hidden");

    result.classList.add("hidden");


    try {

        const response = await fetch(
            "/predict",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            throw new Error(
                "Prediction failed"
            );

        }


        const data =
            await response.json();


        prediction.textContent =
            data.prediction;

        confidence.textContent =
            data.confidence + "%";


        result.classList.remove(
            "hidden"
        );


    } catch (error) {

        alert(
            "Something went wrong while predicting."
        );

        console.error(error);

    }


    loading.classList.add("hidden");

    predictBtn.disabled = false;

});