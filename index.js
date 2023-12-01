const randomiseBtn = document.querySelector(".randomiseBtn");
const bubbleSortBtn = document.querySelector(".bubbleSortBtn");
const quickSortBtn = document.querySelector(".quickSortBtn");
const mergeSortBtn = document.querySelector(".mergeSortBtn");
const compression_count = document.querySelector(".compression-count");
const total_number = document.querySelector(".number");

const setUp = () => {
    const arr = [];
    let interVal = 10;
    let isSorting = false;
    const eachBarWidth = 20;
    let count = 0;
    const totalWidth = window.innerWidth;
    const totalBarCount = Math.floor(totalWidth / eachBarWidth);
    const barsDiv = document.querySelector(".bars");
    total_number.innerText = totalBarCount;

    const randomNumber = (min, max) => {
        return Math.random() * (max - min + 1) + min;
    };

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const beep = () => {
        const beepSound = new Audio("./beep-6.mp3");
        beepSound.play();
    };

    const createRandomArray = () => {
        arr.length = 0;
        for (let i = 0; i < totalBarCount; i++) {
            arr.push(randomNumber(1, 9));
        }
    };

    const renderBars = () => {
        barsDiv.innerHTML = null;
        createRandomArray();
        arr.forEach((item) => {
            const barDiv = document.createElement("div");
            barDiv.classList.add("bar");
            barDiv.style.setProperty("--hight", `${item}`);
            barsDiv.appendChild(barDiv);
        });
    };

    const bubbleSort = async () => {
        const bars = document.querySelectorAll(".bar");
        const n = arr.length;
        isSorting = true;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    for (let k = 0; k < n; k++) {
                        if (k !== j && k !== j + 1) {
                            bars[k].style.setProperty(
                                "background-color",
                                "aqua"
                            );
                        }
                    }
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    bars[j].style.setProperty("--hight", `${arr[j]}`);
                    bars[j].style.setProperty("background-color", "#ec407a");

                    bars[j + 1].style.setProperty("--hight", `${arr[j + 1]}`);
                    bars[j + 1].style.setProperty(
                        "background-color",
                        "#ec407a"
                    );
                    compression_count.innerText = ++count;
                }
                await sleep(interVal);
            }
            await sleep(interVal);
        }

        // end color animation
        for (let k = 0; k < n; k++) {
            bars[k].style.setProperty("background-color", "#ec407a");
            await sleep(interVal);
        }
        for (let k = 0; k < n; k++) {
            bars[k].style.setProperty("background-color", "aqua");
            await sleep(interVal);
        }
        isSorting = false;
    };

    const swap = async (arr, i, j, bars) => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        bars[j].style.setProperty("--hight", `${arr[j]}`);
        bars[j].style.setProperty("background-color", "#ec407a");

        bars[i].style.setProperty("--hight", `${arr[i]}`);
        bars[i].style.setProperty("background-color", "#ec407a");
        await sleep(interVal + 50);
    };

    const partation = async (arr, left, right) => {
        const bars = document.querySelectorAll(".bar");
        let pivot = arr[left],
            i = left,
            j = right;

        for (let i = 0; i < arr.length; i++) {
            if (i !== pivot) {
                bars[i].style.setProperty("background-color", "aqua");
            }
        }
        while (i < j) {
            while (arr[i] <= pivot) i++;
            while (arr[j] > pivot) j--;
            if (i < j) {
                count++;
                compression_count.innerText = count;
                await swap(arr, i, j, bars);
            }
        }
        count++;
        compression_count.innerText = count;
        await swap(arr, left, j, bars);
        return j;
    };

    const quickSort = async (arr, left, right) => {
        if (left < right) {
            let pivot = await partation(arr, left, right);
            await quickSort(arr, left, pivot - 1);
            await quickSort(arr, pivot + 1, right);
        }
    };

    const merge = (arr, left, mid, right) => {
        const bars = document.querySelectorAll(".bar");
        const n1 = mid - left + 1;
        const n2 = right - mid;

        const leftArr = new Array(n1);
        const rightArr = new Array(n2);

        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }

        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                bars[k].style.setProperty("--hight", `${arr[k]}`);
                bars[k].style.setProperty("background-color", "#ec407a");
                bars[i].style.setProperty("--hight", `${arr[i]}`);
                bars[i].style.setProperty("background-color", "#ec407a");
                arr[k] = leftArr[i++];
            } else {
                bars[k].style.setProperty("--hight", `${arr[k]}`);
                bars[k].style.setProperty("background-color", "#ec407a");
                bars[j].style.setProperty("--hight", `${arr[j]}`);
                bars[j].style.setProperty("background-color", "#ec407a");
                arr[k] = rightArr[j++];
            }
            k++;
        }

        while (i < n1) {
            bars[k].style.setProperty("--hight", `${arr[k]}`);
            bars[k].style.setProperty("background-color", "#ec407a");
            bars[i].style.setProperty("--hight", `${arr[i]}`);
            bars[i].style.setProperty("background-color", "#ec407a");
            arr[k++] = leftArr[i++];
        }

        while (j < n2) {
            bars[k].style.setProperty("--hight", `${arr[k]}`);
            bars[k].style.setProperty("background-color", "#ec407a");
            bars[j].style.setProperty("--hight", `${arr[j]}`);
            bars[j].style.setProperty("background-color", "#ec407a");
            arr[k++] = rightArr[j++];
        }
    };

    const mergeSort = (arr, left, right) => {
        if (left < right) {
            let mid = Math.floor(left + (right - left) / 2);
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    };

    randomiseBtn.onclick = () => {
        if (!isSorting) {
            count = 0;
            compression_count.innerText = count;
            renderBars();
        }
    };
    bubbleSortBtn.onclick = () => {
        if (!isSorting) {
            count = 0;
            compression_count.innerText = count;
            bubbleSort();
        }
    };
    quickSortBtn.onclick = async () => {
        if (!isSorting) {
            count = 0;
            compression_count.innerText = count;
            isSorting = true;
            await quickSort(arr, 0, arr.length - 1);

            // end color animation
            const bars = document.querySelectorAll(".bar");
            for (let k = 0; k < arr.length; k++) {
                bars[k].style.setProperty("background-color", "#ec407a");
                await sleep(interVal);
            }
            for (let k = 0; k < arr.length; k++) {
                bars[k].style.setProperty("background-color", "aqua");
                await sleep(interVal);
            }
            isSorting = false;
        }
    };
    mergeSortBtn.onclick = async () => {
        mergeSort(arr, 0, arr.length - 1);
        console.log(arr);
    };

    renderBars();
};

window.addEventListener("resize", () => {
    setUp();
});

setUp();
