<div align="center">

# 😷 Face Mask Detector

### A CNN-powered web app that detects whether a person is wearing a face mask

[![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.5-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Made with ❤](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg)]()

**[Overview](#-overview) • [Demo](#-demo) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Model Architecture](#-model-architecture) • [Installation](#%EF%B8%8F-installation) • [Usage](#-usage) • [API Reference](#-api-reference) • [Results](#-results) • [Roadmap](#%EF%B8%8F-roadmap)**

</div>

---

## 🔍 Overview

**Face Mask Detector** is an end-to-end deep learning project that classifies images as either **"With Mask"** or **"Without Mask"** using a custom Convolutional Neural Network (CNN) built with **PyTorch**, served through a lightweight **FastAPI** web application.

Upload a photo through the browser, and the model returns a predicted class along with a confidence score — all in real time.

| Class | Description |
|---|---|
| 😷 **With Mask** | Face mask correctly detected |
| 🙂 **Without Mask** | No face mask detected |

> ⚠️ **Disclaimer:** This project is for educational purposes only. It is a demo classifier, not a certified compliance or safety-monitoring tool.

---

## 🎬 Demo

<div align="center">

```
┌─────────────────────────────┐        ┌─────────────────────────────┐
│                                  │        │  Prediction: With Mask           │
│      [ Upload a Photo ]          │  --->  │  Confidence: 98.10%              │
│                                  │        │                                  │
└─────────────────────────────┘        └─────────────────────────────┘
```

</div>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Model** | PyTorch (custom CNN) |
| **Backend / API** | FastAPI, Uvicorn |
| **Templating** | Jinja2 |
| **Image Processing** | Pillow, Torchvision Transforms |
| **Frontend** | HTML / CSS / JS (served via `static/` & `templates/`) |
| **Training Environment** | Jupyter Notebook |

---

## 🧠 Model Architecture

A compact CNN trained on 128×128 RGB images:

```
Input (3×128×128)
   │
   ├─ Conv2d(3→32, 3×3, no padding) → ReLU → MaxPool(2×2)
   ├─ Conv2d(32→64, 3×3, no padding) → ReLU → MaxPool(2×2)
   ├─ Conv2d(64→128, 3×3, no padding) → ReLU → MaxPool(2×2)
   │
   ├─ Flatten (128×14×14)
   ├─ Linear(25088 → 2256) → ReLU
   └─ Linear(2256 → 2)  →  [With Mask | Without Mask]
```

**Training configuration:**

| Parameter | Value |
|---|---|
| Loss Function | CrossEntropyLoss |
| Optimizer | Adam (`lr=0.001`) |
| Batch Size | 85 |
| Epochs | 10 |
| Data Splits | Separate Train / Validation / Test folders |
| Input Size | 128×128 |
| Normalization | mean=(0.5, 0.5, 0.5), std=(0.5, 0.5, 0.5) |

---

## 📊 Results

Training and validation metrics are printed at the end of `data_preprocessing_and_model_training.ipynb` (per-epoch loss and final validation accuracy). Run the notebook end-to-end to reproduce them and drop your numbers in below:

| Metric | Score |
|---|---|
| Final Training Loss | _fill in after running the notebook_ |
| Validation Accuracy | _fill in after running the notebook_ |

---

## 📁 Project Structure

```
face-mask-detector/
├── main.py                                                         
├── data_preprocessing_and_model_training.ipynb 
├── templates/
│   └── index.html
├── demo_material/
│   ├── demo_video.mp4
│   └── demo_image.png                 
├── static/
|   ├── script.js
│   └── style.ccs                                
├── requirements.txt
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/<zakir-maswani>/Face-Mask-Detection.git
cd face-mask-detector
```

### 2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Ensure the model file is present
Place `face_mask_detector.pth` in the project root (train it yourself using the included notebook, or download a pre-trained copy if provided).
Download model from Kaggle: 

---

## 🚀 Usage

### Run the app
```bash
python main.py
```
or, using Uvicorn directly with hot-reload:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Then open your browser at:
```
http://127.0.0.1:8000
```

Upload a photo on the home page and get an instant prediction with a confidence score.

### (Optional) Retrain the model
Open `data_preprocessing_and_model_training.ipynb` in Jupyter, update the `Train` / `Test` / `Validation` dataset paths, and run all cells to reproduce or retrain the model.

---

## 📡 API Reference

### `GET /`
Renders the home page (upload interface).

### `POST /predict`
Runs inference on an uploaded image.

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | image file | Photo of a face (JPEG/PNG) |

**Example (cURL):**
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -F "file=@sample_photo.jpg"
```

**Response:**
```json
{
  "prediction": "With Mask",
  "confidence": 98.10
}
```

---

## 🗺️ Roadmap

- [ ] Add data augmentation to improve generalization
- [ ] Add GPU/CUDA inference support
- [ ] Support real-time webcam detection
- [ ] Dockerize the application
- [ ] Add automated tests for the `/predict` endpoint
- [ ] Deploy to a public hosting platform (Render / Railway / HF Spaces)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an [issue](../../issues) or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with 😷 + 🔥 PyTorch + ⚡ FastAPI

</div>
