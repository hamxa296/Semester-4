import json

dir_path = "C:/Users/hamzz/OneDrive/Documents/GitHub/Semester-4/AI 221-L/Practice_Exams"

def update_nb(filename, cells_data):
    cells = []
    for cell_type, source in cells_data:
        cell = {
            "cell_type": cell_type,
            "metadata": {},
            "source": [line + "\n" for line in source.split("\n")]
        }
        if cell_type == "code":
            cell["outputs"] = []
            cell["execution_count"] = None
        if cell["source"]:
            cell["source"][-1] = cell["source"][-1][:-1]
        cells.append(cell)
        
    nb = {
        "cells": cells,
        "metadata": {},
        "nbformat": 4,
        "nbformat_minor": 5
    }
    with open(f"{dir_path}/{filename}", "w") as f:
        json.dump(nb, f, indent=1)

# NB1
nb1_cells = [
    ("markdown", "# Practice Exam 1: Real Estate Price Prediction (Regression)\n**Objective:** Build models to predict continuous housing prices from scratch.\n\n**Models to implement:** Linear Regression, Decision Tree Regressor, Random Forest Regressor.\n\n*Run the cell below to load the corrupted dataset, then write your own code to perform EDA, preprocessing, model training, and evaluation.*"),
    ("code", "import pandas as pd\nimport numpy as np\nfrom sklearn.datasets import fetch_california_housing\n\n# Load dataset\ndata = fetch_california_housing()\ndf = pd.DataFrame(data.data, columns=data.feature_names)\ndf['Target_Price'] = data.target\n\n# Artificially inject missing values in 'HouseAge' and 'AveRooms' for practice\nnp.random.seed(42)\ndf.loc[np.random.choice(df.index, 500), 'HouseAge'] = np.nan\ndf.loc[np.random.choice(df.index, 300), 'AveRooms'] = np.nan\n\ndf.head()"),
    ("code", "# Your complete pipeline goes here!\n")
]

# NB2
nb2_cells = [
    ("markdown", "# Practice Exam 2: Fraud Detection (Imbalanced Classification)\n**Objective:** Detect fraudulent transactions in a highly imbalanced dataset.\n\n**Models to implement:** Logistic Regression, Support Vector Machine (SVM), Artificial Neural Network (ANN / MLPClassifier).\n\n*Run the cell below to generate the imbalanced dataset (95% normal, 5% fraud). Then, build your entire pipeline below it.*"),
    ("code", "import pandas as pd\nimport numpy as np\nfrom sklearn.datasets import make_classification\n\n# Generate imbalanced data\nX_data, y_data = make_classification(n_samples=5000, n_features=10, n_informative=5, \n                                     n_redundant=2, weights=[0.95, 0.05], random_state=42)\n\ndf = pd.DataFrame(X_data, columns=[f'Feature_{i}' for i in range(1, 11)])\ndf['Class'] = y_data\n\ndf['Class'].value_counts()"),
    ("code", "# Your complete pipeline goes here!\n")
]

# NB3
nb3_cells = [
    ("markdown", "# Practice Exam 3: Mixed Data & Text Classification\n**Objective:** Master Categorical Encoding (Titanic) and Text Vectorization (Spam Detection).\n\n**Models to implement:** K-Nearest Neighbors (KNN), Random Forest, Naive Bayes.\n\n---"),
    ("markdown", "## Part A: Titanic Survival Prediction (Mixed Data Types)\n*Run the cell below to load the Titanic dataset, then build your pipeline (Imputation, Encoding, Scaling, KNN, Random Forest).*"),
    ("code", "import pandas as pd\nimport seaborn as sns\n\n# Load Titanic Dataset\ndf_titanic = sns.load_dataset('titanic')\ndf_titanic = df_titanic[['survived', 'pclass', 'sex', 'age', 'fare', 'embarked']]\ndf_titanic.head()"),
    ("code", "# Your Titanic pipeline goes here!\n"),
    ("markdown", "---\n## Part B: Spam Detection (Text Data)\n*Run the cell below to load the raw text data. Use CountVectorizer and MultinomialNB to train a spam detector.*"),
    ("code", "# 1 = Spam, 0 = Not Spam\ntexts = [\n    \"Win a free iPhone now! Click here\", \n    \"Hey, are we still meeting for lunch?\", \n    \"URGENT: Your bank account has been locked. Call now.\", \n    \"Can you send me the notes from Lab 11?\",\n    \"Congratulations! You've been selected for a $1000 gift card.\",\n    \"I'll be 5 minutes late, traffic is bad.\"\n]\nlabels = [1, 0, 1, 0, 1, 0]"),
    ("code", "# Your Spam Detection pipeline goes here!\n")
]

update_nb("Practice_Exam_1_Regression.ipynb", nb1_cells)
update_nb("Practice_Exam_2_Imbalanced_Classification.ipynb", nb2_cells)
update_nb("Practice_Exam_3_Mixed_and_Text.ipynb", nb3_cells)
