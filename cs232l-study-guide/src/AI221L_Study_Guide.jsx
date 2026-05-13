import { useState } from "react";

const labs = [
  {
    id: "Strategy",
    title: "Mindmap & Strategy",
    emoji: "🧠",
    color: "#E67E22",
    tagline: "When to do what, General Workflow, and Algorithm Selection",
    sections: [
      {
        title: "The Complete ML Pipeline",
        type: "concept",
        content: `**1. EDA (Exploratory Data Analysis):** Understand your data first. Look for missing values, outliers, and correlations.
**2. Preprocessing:** Clean the data. Handle nulls, encode categorical text into numbers, and scale numericals.
**3. Splitting:** Split data into Train and Test sets (\`train_test_split\`) to avoid data leakage.
**4. Model Selection:** Choose an algorithm based on problem type (Regression vs Classification).
**5. Training:** Fit the model on the training data (\`model.fit(X_train, y_train)\`).
**6. Evaluation:** Test on unseen data (\`y_pred = model.predict(X_test)\`) and check metrics.
**7. Tuning:** Adjust hyperparameters (like K in KNN, or Kernels in SVM) to improve performance.`
      },
      {
        title: "Algorithm Mindmap (When to use what?)",
        type: "comparison",
        items: [
          { label: "Predicting a Number?", desc: "Linear Regression (Simple, Multiple), Random Forest Regressor.", color: "#3498DB" },
          { label: "Binary Classification?", desc: "Logistic Regression, SVM, Binary Decision Tree.", color: "#E74C3C" },
          { label: "Multi-class Classification?", desc: "KNN, Naive Bayes, Random Forest, ANN.", color: "#9B59B6" },
          { label: "Text/NLP/Spam Detection?", desc: "Naive Bayes (MultinomialNB is the standard).", color: "#F1C40F" },
          { label: "Need Interpretability?", desc: "Decision Trees (easy to explain), Linear/Logistic Regression.", color: "#2ECC71" },
          { label: "Complex/Non-linear Data?", desc: "SVM (with RBF Kernel), Random Forests, Deep ANNs.", color: "#34495E" }
        ]
      }
    ],
    quiz: [
      { q: "What should you always do before feeding data to a model?", a: "Preprocess it! Handle missing values, encode text to numbers, and scale numerical features." },
      { q: "If your target variable is 'House Price', what kind of algorithm do you need?", a: "A Regression algorithm (like Linear Regression)." },
      { q: "Which algorithm is distance-based and thus strictly requires Feature Scaling?", a: "K-Nearest Neighbors (KNN) and SVM." }
    ]
  },
  {
    id: "Viz",
    title: "Visualizations Cheat Sheet",
    emoji: "📊",
    color: "#2ECC71",
    tagline: "The 5 most essential plots you need to memorize from all 11 labs",
    sections: [
      {
        title: "Why Visualizations?",
        type: "concept",
        content: `You don't need to memorize every possible plot, just the ones that answer the most critical ML questions:
**1. How is my data distributed?** (Histplot)
**2. Is my dataset imbalanced?** (Countplot)
**3. How do features correlate?** (Heatmap)
**4. Is there a linear relationship?** (Scatterplot)
**5. Where is my model making mistakes?** (Confusion Matrix)`
      },
      {
        title: "The Essential 5 Syntax",
        type: "syntax",
        commands: [
          {
            label: "1. Distribution (Histplot)",
            code: `import seaborn as sns
import matplotlib.pyplot as plt

# Perfect for checking outliers or ranges of numerical data
sns.histplot(df['Age'], kde=True) # kde=True adds the smooth curve
plt.show()`,
            note: "Returns an Axes object. Use this to see if scaling is needed."
          },
          {
            label: "2. Class Imbalance (Countplot)",
            code: `# Always use this on your Target variable before Classification!
sns.countplot(x='Target', data=df)
plt.show()`,
            note: "If one bar is huge and the other is tiny, you must use SMOTE or class_weight='balanced'."
          },
          {
            label: "3. Correlation (Heatmap)",
            code: `# The most important EDA step for Feature Selection
corr_matrix = df.corr()

# annot=True shows the actual numbers inside the boxes
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.show()`,
            note: "Look for features that have high correlation with the Target (good) and high correlation with each other (bad - multicollinearity)."
          },
          {
            label: "4. Decision Regions (MLxtend)",
            code: `from mlxtend.plotting import plot_decision_regions
import matplotlib.pyplot as plt

# Perfect for Classification tasks to see the boundary (X must be 2D array)
plot_decision_regions(X=X_train.values, y=y_train.values, clf=model, legend=2)
plt.title('Model Decision Boundary')
plt.show()`,
            note: "MLxtend's plot_decision_regions is the best way to visualize how models like SVM or KNN separate classes."
          },
          {
            label: "5. Confusion Matrix (MLxtend)",
            code: `from sklearn.metrics import confusion_matrix
from mlxtend.plotting import plot_confusion_matrix
import matplotlib.pyplot as plt

# Calculate the matrix
cm = confusion_matrix(y_test, y_pred)

# Plot it beautifully using MLxtend
fig, ax = plot_confusion_matrix(conf_mat=cm, show_absolute=True, show_normed=True, colorbar=True)
plt.show()`,
            note: "MLxtend makes confusion matrices much cleaner than Seaborn. The diagonal shows correct predictions."
          }
        ]
      }
    ],
    quiz: [
      { q: "Which plot is best to check if your binary classification dataset is imbalanced?", a: "sns.countplot(x='Target', data=df)" },
      { q: "What does sns.heatmap(df.corr()) show you?", a: "It shows the correlation matrix, telling you which numerical features are strongly related to the target or each other." },
      { q: "How do you visually see where a classification model is predicting False Positives vs False Negatives?", a: "By plotting the Confusion Matrix using a heatmap." }
    ]
  },
  {
    id: "Master",
    title: "Master Function Dictionary",
    emoji: "📚",
    color: "#8E44AD",
    tagline: "An exhaustive dictionary of EVERY predefined library function used across Labs 1-11",
    sections: [
      {
        title: "1. Pandas & Numpy (Data Manipulation)",
        type: "syntax",
        commands: [
          { label: "pd.read_csv('file.csv')", code: "# Loads a CSV file into a Pandas DataFrame\ndf = pd.read_csv('data.csv')" },
          { label: "df.head() / df.tail()", code: "# Shows the first/last 5 rows of the dataset\ndf.head()" },
          { label: "df.info()", code: "# Prints column data types and non-null counts\ndf.info()" },
          { label: "df.describe()", code: "# Calculates statistical summaries (mean, std, min, max)\ndf.describe()" },
          { label: "df.isnull().sum()", code: "# Counts the number of missing (NaN) values in each column\nmissing = df.isnull().sum()" },
          { label: "df.dropna()", code: "# Deletes any row that contains a missing value\ndf = df.dropna()" },
          { label: "df.fillna(val)", code: "# Replaces missing values with a specific value\ndf['Age'] = df['Age'].fillna(df['Age'].median())" },
          { label: "df.corr()", code: "# Generates a correlation matrix for numerical columns\nmatrix = df.corr()" },
          { label: "df.drop()", code: "# Removes a specific column from the DataFrame\ndf = df.drop('ID', axis=1)" },
          { label: "df.value_counts()", code: "# Counts the occurrences of unique values in a column\ncounts = df['Target'].value_counts()" },
          { label: "pd.get_dummies()", code: "# One-Hot Encoding to convert text to binary columns\ndf_encoded = pd.get_dummies(df, drop_first=True)" },
          { label: "np.bincount(y)", code: "# Counts occurrences of each class in a numpy array\ncounts = np.bincount(y)" }
        ]
      },
      {
        title: "2. Scikit-Learn Preprocessing",
        type: "syntax",
        commands: [
          { label: "train_test_split()", code: "# Splits data. stratify=y keeps class ratios equal.\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)" },
          { label: "StandardScaler()", code: "# Scales features to have mean=0 and std=1.\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)" },
          { label: "MinMaxScaler()", code: "# Scales features to exactly be between 0 and 1.\nscaler = MinMaxScaler()\nX_scaled = scaler.fit_transform(X)" },
          { label: "LabelEncoder()", code: "# Converts categorical text into integers (0, 1, 2).\nle = LabelEncoder()\ny_encoded = le.fit_transform(y)" },
          { label: "CountVectorizer()", code: "# Converts text documents to a matrix of token counts.\nvec = CountVectorizer(stop_words='english')\nX_vec = vec.fit_transform(texts)" },
          { label: "SMOTE()", code: "# Generates synthetic data to fix class imbalances.\nsmote = SMOTE(random_state=42)\nX_resampled, y_resampled = smote.fit_resample(X_train, y_train)" }
        ]
      },
      {
        title: "3. Scikit-Learn Models",
        type: "syntax",
        commands: [
          { label: "LinearRegression()", code: "model = LinearRegression()\nmodel.fit(X_train, y_train)" },
          { label: "LogisticRegression()", code: "model = LogisticRegression(class_weight='balanced')\nmodel.fit(X_train, y_train)" },
          { label: "KNeighborsClassifier()", code: "# REQUIRES SCALING\nmodel = KNeighborsClassifier(n_neighbors=5)\nmodel.fit(X_train, y_train)" },
          { label: "SVC()", code: "model = SVC(kernel='rbf')\nmodel.fit(X_train, y_train)" },
          { label: "GaussianNB()", code: "model = GaussianNB()\nmodel.fit(X_train, y_train)" },
          { label: "MultinomialNB()", code: "# Great for text classification\nmodel = MultinomialNB()\nmodel.fit(X_train, y_train)" },
          { label: "DecisionTreeClassifier()", code: "model = DecisionTreeClassifier(max_depth=5)\nmodel.fit(X_train, y_train)" },
          { label: "RandomForestClassifier()", code: "model = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)" },
          { label: "MLPClassifier()", code: "model = MLPClassifier(hidden_layer_sizes=(10, 5))\nmodel.fit(X_train, y_train)" }
        ]
      },
      {
        title: "4. Keras Deep Learning (Lab 11)",
        type: "syntax",
        commands: [
          { label: "Sequential()", code: "# Initializes a neural network\nmodel = Sequential()" },
          { label: "Dense()", code: "# Adds a layer to the network\nmodel.add(Dense(units=16, activation='relu', input_dim=10))" },
          { label: "model.compile()", code: "# Configures the model for training\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])" },
          { label: "model.fit()", code: "# Trains the neural network\nmodel.fit(X_train, y_train, epochs=50)" }
        ]
      },
      {
        title: "5. Evaluation & Tuning",
        type: "syntax",
        commands: [
          { label: "mean_squared_error()", code: "mse = mean_squared_error(y_test, y_pred)" },
          { label: "r2_score()", code: "r2 = r2_score(y_test, y_pred)" },
          { label: "accuracy_score()", code: "acc = accuracy_score(y_test, y_pred)" },
          { label: "confusion_matrix()", code: "cm = confusion_matrix(y_test, y_pred)" },
          { label: "classification_report()", code: "print(classification_report(y_test, y_pred))" },
          { label: "cross_val_score()", code: "scores = cross_val_score(model, X, y, cv=5)" },
          { label: "GridSearchCV()", code: "grid = GridSearchCV(model, param_grid={'C':[1,10]}, cv=5)\ngrid.fit(X_train, y_train)" }
        ]
      }
    ],
    quiz: [
      { q: "Which preprocessing function is best for encoding the Target variable, and which is best for the Features?", a: "LabelEncoder is best for the Target (y). pd.get_dummies (One-Hot Encoding) is best for Features (X)." },
      { q: "What is the difference between GaussianNB and MultinomialNB?", a: "GaussianNB is for continuous features. MultinomialNB is for discrete counts (like word frequencies in text)." },
      { q: "If you have an imbalanced dataset, which evaluation function should you look at instead of accuracy_score?", a: "classification_report(). You must look at the Recall and F1-Score of the minority class." }
    ]
  },
  {
    id: 1,
    title: "EDA & Preprocessing",
    emoji: "🧹",
    color: "#FF6B35",
    tagline: "Exploring data, handling missing values, encoding, and scaling",
    sections: [
      {
        title: "When and How to do EDA?",
        type: "concept",
        content: `**When?** ALWAYS the first step after loading data. You cannot clean what you don't understand.
**How?** Check data types, null values, statistical summaries, and visualize distributions/relationships.`
      },
      {
        title: "EDA Syntax",
        type: "syntax",
        commands: [
          {
            label: "Basic Inspection",
            code: `import pandas as pd
import seaborn as sns

df = pd.read_csv('data.csv') # Returns a Pandas DataFrame
df.head()        # Returns the first 5 rows of the DataFrame
df.info()        # Returns None (prints a summary of columns & data types)
df.describe()    # Returns a DataFrame with descriptive statistics
df.isnull().sum() # Returns a Series with the count of nulls per column`,
            note: "df.info() and df.isnull().sum() are your best friends for spotting missing data."
          },
          {
            label: "Visualization",
            code: `sns.pairplot(df, hue='target')  # Returns a PairGrid (a grid of subplots)
sns.heatmap(df.corr(), annot=True) # Returns a Matplotlib Axes object`,
            note: "Correlation heatmaps help identify which features are strongly related to the target."
          }
        ]
      },
      {
        title: "When to do Preprocessing?",
        type: "concept",
        content: `**When?** AFTER EDA and BEFORE training a model. Models only understand Numbers, and they hate missing values.
1. **Imputation:** When data has missing/null values (NaN).
2. **Encoding:** When you have text/categorical columns (e.g., 'Red', 'Blue').
3. **Scaling:** When numerical columns have vastly different ranges (e.g., Age 1-100 vs Salary 1000-100000). Essential for KNN, SVM, ANN.`
      },
      {
        title: "Preprocessing Syntax",
        type: "syntax",
        commands: [
          {
            label: "Handling Missing Values",
            code: `# Option 1: Drop rows with missing values (if very few)
df.dropna(inplace=True) # Returns None due to inplace=True (modifies directly)

# Option 2: Fill with Mean/Median (Imputation)
df['Age'] = df['Age'].fillna(df['Age'].mean()) # Returns a new Series with filled values`,
            note: "Use median instead of mean if the data has extreme outliers."
          },
          {
            label: "Encoding Categorical Data",
            code: `from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# 1. Label Encoding (Best for Ordinal data or Target variables)
le = LabelEncoder()
df['Quality'] = le.fit_transform(df['Quality']) # Returns a 1D NumPy array of integers

# 2. One-Hot Encoding (Best for Nominal data like 'City' or 'Gender')
encoder = OneHotEncoder(drop='first', sparse_output=False)
encoded_cols = encoder.fit_transform(df[['City']]) # Returns a 2D NumPy array of 0s and 1s

# 3. Pandas Dummies (Easier alternative for One-Hot Encoding)
df = pd.get_dummies(df, columns=['City', 'Gender'], drop_first=True) # Returns a NEW DataFrame`,
            note: "Use LabelEncoder for ordinal data (Low, Medium, High). Use One-Hot Encoding for nominal data (colors, cities) to prevent algorithms from falsely assuming a numerical hierarchy."
          },
          {
            label: "Train-Test Split (DO THIS BEFORE SCALING!)",
            code: `from sklearn.model_selection import train_test_split

X = df.drop('Target', axis=1) # Features
y = df['Target']              # Labels

# Returns a list of 4 arrays: X_train, X_test, y_train, y_test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)`,
            note: "random_state ensures you get the exact same split every time you run the code."
          },
          {
            label: "Feature Scaling (The Golden Rule against Data Leakage)",
            code: `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

# 1. FIT & TRANSFORM on Training Data ONLY
# The scaler learns the mean and std ONLY from the training data.
X_train_scaled = scaler.fit_transform(X_train) # Returns a scaled 2D NumPy array

# 2. TRANSFORM the Test Data
# Do NOT fit! We scale the test data using the parameters learned from training.
X_test_scaled = scaler.transform(X_test) # Returns a scaled 2D NumPy array`,
            note: "🚨 CRITICAL DATA LEAKAGE RULE: If you scale the entire dataset before splitting, the scaler calculates the mean/std using the Test Data too. This 'leaks' secret test information into your training process, causing your model to cheat and falsely report high accuracy."
          }
        ]
      }
    ],
    quiz: [
      { q: "Why do we use One-Hot Encoding instead of Label Encoding for nominal data (like 'Red', 'Green', 'Blue')?", a: "Because Label Encoding assigns ordered numbers (0, 1, 2) which might make the algorithm think 'Blue' (2) is greater than 'Red' (0). One-Hot creates separate binary columns." },
      { q: "What does StandardScaler do?", a: "It scales features so they have a mean of 0 and a standard deviation of 1." },
      { q: "Why must we split data into training and testing sets?", a: "To evaluate how well the model generalizes to new, unseen data, preventing overfitting." }
    ]
  },
  {
    id: "Adv",
    title: "Advanced: SMOTE & Pipelines",
    emoji: "🚀",
    color: "#8E44AD",
    tagline: "Handling severe class imbalance and automating workflows",
    sections: [
      {
        title: "Class Imbalance & SMOTE",
        type: "concept",
        content: `**The Problem:** If 99% of your data is 'Normal' and 1% is 'Fraud', a model can just guess 'Normal' every time and be 99% accurate! Accuracy is misleading here.
**The Solution (SMOTE):** Synthetic Minority Over-sampling Technique. Instead of duplicating the rare 1% data (which causes overfitting), SMOTE generates *synthetic* (fake but realistic) data points to balance the classes.
🚨 **CRITICAL RULE:** ONLY apply SMOTE to your **Training Data**. Never apply it to Test Data, because Test Data must represent the real world!`
      },
      {
        title: "SMOTE Syntax",
        type: "syntax",
        commands: [
          {
            label: "Applying SMOTE",
            code: `from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)

# Notice we ONLY fit and resample the Training data!
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Now you train your model on X_train_resampled and y_train_resampled`,
            note: "If you don't want to use SMOTE, an alternative is to pass `class_weight='balanced'` to algorithms like Logistic Regression or Random Forest."
          }
        ]
      },
      {
        title: "Custom Prediction Pipeline (Manual Function)",
        type: "concept",
        content: `**The Problem:** Once your model is trained, predicting on new, raw data is tricky because you have to remember to apply the exact same scaling and imputation steps you did during training.
**The Solution (Custom Function):** You can build a custom Python function to act as a pipeline. You save your trained Scaler and Model (using \`joblib\`), load them inside the function, manually scale the new data, and then return the prediction.`
      },
      {
        title: "Custom Pipeline Syntax",
        type: "syntax",
        commands: [
          {
            label: "Building a Prediction Function",
            code: `import joblib
import pandas as pd

# 1. Save your trained scaler and model after training
# joblib.dump(scaler, 'scaler.pkl')
# joblib.dump(model, 'model.pkl')

def predict_fraud(input_data):
    # 2. Load the saved scaler and model
    loaded_scaler = joblib.load('scaler.pkl')
    loaded_model = joblib.load('model.pkl')
    
    # 3. Convert input to DataFrame and Scale
    df_input = pd.DataFrame([input_data])
    scaled_input = loaded_scaler.transform(df_input)
    
    # 4. Predict
    prediction = loaded_model.predict(scaled_input)
    return "Fraud" if prediction[0] == 1 else "Normal"`,
            note: "This manual approach was used in Lab 5. It ensures you never forget to scale your data before asking the model for a prediction!"
          }
        ]
      }
    ],
    quiz: [
      { q: "Why must you ONLY apply SMOTE to the training set?", a: "Because the test set must remain untouched to accurately represent real-world data distribution. SMOTEing the test set is considered Data Leakage." },
      { q: "Why is it useful to build a custom prediction function that loads a saved scaler?", a: "Because new data must be scaled using the EXACT same mean and standard deviation that the model was trained on, otherwise the prediction will be completely wrong." }
    ]
  },
  {
    id: "2-4",
    title: "Regression",
    emoji: "📈",
    color: "#3498DB",
    tagline: "Linear (Continuous) and Logistic (Classification)",
    sections: [
      {
        title: "Linear Regression (Lab 2)",
        type: "concept",
        content: `**Use Case:** Predicting a continuous number (e.g., House Price, Stock Price, Temperature).
**Concept:** Finds the best-fitting straight line (hyperplane) through the data points by minimizing the Mean Squared Error (MSE).
Equation: \`y = mx + c\` (or \`y = w1x1 + w2x2 ... + b\`)`
      },
      {
        title: "Linear Regression Syntax",
        type: "syntax",
        commands: [
          {
            label: "Training & Prediction",
            code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Initialize and train
model = LinearRegression()
model.fit(X_train, y_train) # Returns the fitted model instance

# Predict
y_pred = model.predict(X_test) # Returns a NumPy array of predictions

# Evaluate
print("MSE:", mean_squared_error(y_test, y_pred)) # Returns a float (the error)
print("R2 Score:", r2_score(y_test, y_pred)) # Returns a float (the score)`,
            note: "R2 Score tells you how much variance in the target is explained by the features (closer to 1.0 is better)."
          }
        ]
      },
      {
        title: "Logistic Regression (Lab 3-4)",
        type: "concept",
        content: `**Use Case:** Classification! Predicting discrete classes (e.g., Spam/Not Spam, Disease/No Disease).
**Concept:** It's essentially Linear Regression passed through a **Sigmoid function** to output probabilities between 0 and 1. If probability > 0.5, class 1; else class 0.`
      },
      {
        title: "Logistic Regression Syntax",
        type: "syntax",
        commands: [
          {
            label: "Training & Classification Metrics",
            code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# Initialize and train
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train) # Returns the fitted model instance

# Predict
y_pred = model.predict(X_test) # Returns a NumPy array of class predictions

# Evaluate
print("Accuracy:", accuracy_score(y_test, y_pred)) # Returns a float
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred)) # Returns a 2D NumPy array
print("Report:\n", classification_report(y_test, y_pred)) # Returns a formatted string`,
            note: "Always look at Precision, Recall, and F1-Score in the classification_report, especially for imbalanced datasets."
          }
        ]
      }
    ],
    quiz: [
      { q: "Is Logistic Regression used for Regression or Classification tasks?", a: "Classification!" },
      { q: "What function does Logistic Regression use to convert linear outputs into probabilities?", a: "The Sigmoid function." },
      { q: "What is R2 score in Linear Regression?", a: "A metric that represents the proportion of the variance for a dependent variable that's explained by an independent variable. 1.0 is perfect." }
    ]
  },
  {
    id: "5-6",
    title: "KNN & Naive Bayes",
    emoji: "🎯",
    color: "#9B59B6",
    tagline: "Distance-based and Probabilistic Classifiers",
    sections: [
      {
        title: "K-Nearest Neighbors (KNN) - Lab 5",
        type: "concept",
        content: `**Concept:** "Tell me who your neighbors are, and I'll tell you who you are." It classifies a data point based on the majority class of its 'K' nearest neighbors.
**Key Rule:** Data **MUST be scaled** because KNN relies on Euclidean distance. If one feature is in thousands and another in decimals, the larger one will dominate the distance calculation!
**Choosing K:** Usually an odd number (3, 5, 7) to avoid ties. Too small = noisy/overfit. Too large = underfit.`
      },
      {
        title: "KNN Syntax",
        type: "syntax",
        commands: [
          {
            label: "KNN Classifier",
            code: `from sklearn.neighbors import KNeighborsClassifier

# Initialize with K=5
knn = KNeighborsClassifier(n_neighbors=5)

# Train and Predict (Assuming X_train is ALREADY SCALED!)
knn.fit(X_train, y_train) # Returns the fitted model instance
y_pred = knn.predict(X_test) # Returns a NumPy array of predictions`,
            note: "Never use KNN without standardizing/scaling your X data first."
          }
        ]
      },
      {
        title: "Naive Bayes (Lab 6)",
        type: "concept",
        content: `**Concept:** Based on Bayes' Theorem. It is "Naive" because it assumes that all features are **completely independent** of each other (which is rarely true in real life, but it works amazingly well anyway).
**Best For:** Text classification, Spam filtering, Sentiment analysis. Very fast and handles high-dimensional data well.`
      },
      {
        title: "Naive Bayes Syntax",
        type: "syntax",
        commands: [
          {
            label: "Gaussian Naive Bayes (Continuous Data)",
            code: `from sklearn.naive_bayes import GaussianNB

nb = GaussianNB()
nb.fit(X_train, y_train)
y_pred = nb.predict(X_test)`,
            note: "GaussianNB assumes your numerical features follow a normal (Gaussian) distribution."
          },
          {
            label: "Text Vectorization (For Spam Detection)",
            code: `from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()
# Convert text messages into numerical token counts
X_vectorized = vectorizer.fit_transform(text_data) # Returns a sparse SciPy matrix`,
            note: "In text classification, you must convert text to numbers first using CountVectorizer or TF-IDF before feeding to Naive Bayes."
          }
        ]
      }
    ],
    quiz: [
      { q: "Why MUST you scale data before using KNN?", a: "Because KNN uses distance metrics (like Euclidean). Unscaled features with larger ranges will artificially dominate the distance calculation." },
      { q: "Why is Naive Bayes called 'Naive'?", a: "It makes the naive assumption that all features are statistically independent of one another." },
      { q: "Which model is historically the go-to for Spam Detection?", a: "Naive Bayes (often MultinomialNB with CountVectorizer)." }
    ]
  },
  {
    id: "7-8",
    title: "Trees & Ensembles",
    emoji: "🌲",
    color: "#2ECC71",
    tagline: "Decision Trees, Bagging, and Random Forests",
    sections: [
      {
        title: "Decision Trees (Lab 7)",
        type: "concept",
        content: `**Concept:** Works like a flowchart. It splits the data based on features to maximize **Information Gain** (or minimize Gini impurity). 
**Pros:** Very easy to interpret, no scaling needed.
**Cons:** Highly prone to **overfitting** (creating a very deep tree that memorizes the training data).`
      },
      {
        title: "Decision Tree Syntax",
        type: "syntax",
        commands: [
          {
            label: "Decision Tree Classifier",
            code: `from sklearn.tree import DecisionTreeClassifier

# max_depth helps prevent overfitting
dt = DecisionTreeClassifier(criterion='gini', max_depth=5)
dt.fit(X_train, y_train) # Returns the fitted tree instance
y_pred = dt.predict(X_test) # Returns a NumPy array of predictions`,
            note: "Limiting max_depth is a form of 'pruning' to stop the tree from becoming too complex."
          }
        ]
      },
      {
        title: "Ensemble Learning & Random Forest (Lab 8)",
        type: "concept",
        content: `**Concept:** "Wisdom of the crowd." Instead of relying on one model, train multiple models and combine their predictions.
**Bagging (Bootstrap Aggregating):** Train multiple models on random subsets of the data (with replacement).
**Random Forest:** An extension of Bagging where we build many Decision Trees. It not only uses random data subsets but also random subsets of **features** at each split. This makes the trees diverse and drastically reduces overfitting!`
      },
      {
        title: "Random Forest Syntax",
        type: "syntax",
        commands: [
          {
            label: "Random Forest Classifier",
            code: `from sklearn.ensemble import RandomForestClassifier

# n_estimators = number of trees in the forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train) # Returns the fitted ensemble instance
y_pred = rf.predict(X_test) # Returns a NumPy array of predictions`,
            note: "Random Forests are powerful and rarely overfit, but they are 'black boxes' (hard to interpret compared to a single Decision Tree)."
          }
        ]
      }
    ],
    quiz: [
      { q: "What is the main disadvantage of a single Decision Tree?", a: "It is highly prone to overfitting the training data." },
      { q: "How does a Random Forest fix the overfitting problem of Decision Trees?", a: "By training many trees on random subsets of data AND random subsets of features, then averaging their predictions (Ensemble learning)." },
      { q: "Do you need to scale data for Decision Trees or Random Forests?", a: "No, tree-based models do not rely on distances, so scaling is not required." }
    ]
  },
  {
    id: "9-11",
    title: "SVM & ANN",
    emoji: "🌌",
    color: "#E74C3C",
    tagline: "Support Vector Machines and Neural Networks",
    sections: [
      {
        title: "Support Vector Machines (SVM) - Lab 9",
        type: "concept",
        content: `**Concept:** Finds the optimal **hyperplane** (line/surface) that distinctly classifies data points while maximizing the **margin** between the classes.
The closest data points to the hyperplane are called **Support Vectors**.
**The Kernel Trick:** If data is not linearly separable, SVM uses a 'Kernel' (like RBF or Polynomial) to implicitly map the data into a higher dimension where a straight line *can* separate it.`
      },
      {
        title: "SVM Syntax",
        type: "syntax",
        commands: [
          {
            label: "SVM Classifier",
            code: `from sklearn.svm import SVC

# kernel can be 'linear', 'poly', 'rbf', 'sigmoid'
svm_model = SVC(kernel='rbf', C=1.0)
svm_model.fit(X_train, y_train) # Returns the fitted SVM instance
y_pred = svm_model.predict(X_test) # Returns a NumPy array of predictions`,
            note: "'C' is the regularization parameter. High C = strict margin (might overfit). Low C = soft margin (allows some misclassifications)."
          }
        ]
      },
      {
        title: "Artificial Neural Networks (ANN) - Lab 10, 11",
        type: "concept",
        content: `**Concept:** Inspired by the human brain. We use prebuilt frameworks to build and train models.
**Key terms:**
• **Layers:** Input, Hidden (for feature extraction), and Output (for final prediction).
• **Activation:** **ReLU** for hidden layers (fast) and **Sigmoid** for output (probability).
• **XOR Problem:** Requires a hidden layer because XOR is not linearly separable.`
      },
      {
        title: "Prebuilt ANN Models (Sklearn & Keras)",
        type: "syntax",
        commands: [
          {
            label: "Scikit-Learn (MLPClassifier)",
            code: `from sklearn.neural_network import MLPClassifier

# Simple and effective for smaller datasets
mlp = MLPClassifier(hidden_layer_sizes=(8, 4), activation='relu', max_iter=1000)
mlp.fit(X_train, y_train)
y_pred = mlp.predict(X_test)`,
            note: "MLP (Multi-Layer Perceptron) is the standard prebuilt ANN in Sklearn."
          },
          {
            label: "Keras / TensorFlow (Sequential)",
            code: `from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential([
    Dense(8, input_dim=2, activation='relu'), # Hidden Layer
    Dense(1, activation='sigmoid')           # Output Layer
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.fit(X, y, epochs=500, verbose=0)`,
            note: "Keras is used for more complex, deep neural networks (Deep Learning)."
          }
        ]
      }
    ],
    quiz: [
      { q: "What are Support Vectors?", a: "The data points that lie closest to the decision surface/hyperplane in an SVM. They are the points that actually dictate the position of the line." },
      { q: "What is the 'Kernel Trick'?", a: "A method used by SVMs to project non-linearly separable data into a higher dimension where it CAN be separated by a linear hyperplane." },
      { q: "Why do Neural Networks need Activation Functions?", a: "To introduce non-linearity. Without activation functions, no matter how many layers the ANN has, it would just behave like a single linear regression model." },
      { q: "What is Backpropagation?", a: "The process of calculating the gradient of the loss function and updating the network's weights backwards from output to input." }
    ]
  }
];

const SyntaxBlock = ({ code, label, note }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ marginBottom: 20, borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a" }}>
      <div style={{ background: "#1a1a2e", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#7ecfff", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{label}</span>
        <button onClick={copy} style={{ background: "none", border: "1px solid #444", color: "#aaa", borderRadius: 4, padding: "2px 8px", cursor: "pointer", fontSize: 11 }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre style={{ background: "#0d0d1a", color: "#e8e8ff", padding: "14px 16px", margin: 0, fontSize: 13, overflowX: "auto", lineHeight: 1.7, fontFamily: "'Courier New', monospace" }}>
        {code}
      </pre>
      {note && <div style={{ background: "#131325", borderTop: "1px solid #2a2a3a", padding: "8px 14px", color: "#ffd580", fontSize: 12, lineHeight: 1.5 }}>
        💡 {note}
      </div>}
    </div>
  );
};

const renderContent = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#1a1a2e;padding:1px 5px;border-radius:3px;font-size:12px;color:#7ecfff">$1</code>');
    return <p key={i} style={{ margin: "4px 0", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: formatted }} />;
  });
};

export default function AI221LStudyGuide() {
  const [activeLab, setActiveLab] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mode, setMode] = useState("learn"); // "learn" | "quiz"
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const lab = labs[activeLab];
  const section = lab.sections[activeSection];

  const startQuiz = () => {
    setMode("quiz");
    setQuizIndex(0);
    setShowAnswer(false);
    setQuizDone(false);
  };

  const nextQuestion = () => {
    if (quizIndex < lab.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setShowAnswer(false);
    } else {
      setQuizDone(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a12", color: "#e8e8f0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Header */}
      <div style={{ background: "#0f0f1e", borderBottom: "1px solid #2a2a3a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>AI 221-L Comprehensive Study Guide</div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>GIKI · Artificial Intelligence Lab</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: "#aaa", background: "#1a1a2e", padding: "4px 12px", borderRadius: 20, border: "1px solid #333" }}>
          Labs 1–11 • Exam Preparation
        </div>
      </div>

      {/* Lab Tabs */}
      <div style={{ display: "flex", overflowX: "auto", background: "#0d0d1a", borderBottom: "1px solid #2a2a3a", padding: "8px 12px", gap: 6 }}>
        {labs.map((l, i) => (
          <button key={i} onClick={() => { setActiveLab(i); setActiveSection(0); setMode("learn"); }}
            style={{
              background: activeLab === i ? l.color : "transparent",
              border: `1px solid ${activeLab === i ? l.color : "#333"}`,
              color: activeLab === i ? "#fff" : "#aaa",
              borderRadius: 8, padding: "6px 14px", cursor: "pointer", whiteSpace: "nowrap",
              fontSize: 12, fontWeight: 600, transition: "all 0.15s"
            }}>
            {l.emoji} {l.id === "Strategy" ? "Strategy" : `Lab ${l.id}`}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Sidebar */}
        <div style={{ width: 220, background: "#0d0d1a", borderRight: "1px solid #2a2a3a", padding: 12, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ color: lab.color, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            {lab.emoji} {lab.title}
          </div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 14, lineHeight: 1.5, fontStyle: "italic" }}>
            {lab.tagline}
          </div>
          
          {mode === "learn" && lab.sections.map((s, i) => (
            <button key={i} onClick={() => setActiveSection(i)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: activeSection === i ? `${lab.color}22` : "transparent",
                border: `1px solid ${activeSection === i ? lab.color : "transparent"}`,
                borderRadius: 6, padding: "7px 10px", cursor: "pointer",
                color: activeSection === i ? lab.color : "#888",
                fontSize: 11, marginBottom: 4, fontWeight: activeSection === i ? 600 : 400,
                lineHeight: 1.4
              }}>
              {s.title}
            </button>
          ))}

          <button onClick={startQuiz}
            style={{
              display: "block", width: "100%", marginTop: 12,
              background: mode === "quiz" ? lab.color : "transparent",
              border: `1px solid ${lab.color}`,
              color: mode === "quiz" ? "#fff" : lab.color,
              borderRadius: 8, padding: "8px", cursor: "pointer",
              fontSize: 12, fontWeight: 700
            }}>
            📝 Quick Quiz
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px", maxWidth: 780 }}>
          
          {mode === "learn" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 4, height: 28, background: lab.color, borderRadius: 2 }} />
                <h2 style={{ margin: 0, fontSize: 20, color: "#fff" }}>{section.title}</h2>
              </div>
              
              {section.type === "concept" && (
                <div style={{ background: "#111122", border: `1px solid ${lab.color}44`, borderRadius: 10, padding: 18, marginBottom: 20, fontSize: 14, lineHeight: 1.9 }}>
                  {renderContent(section.content)}
                </div>
              )}

              {section.type === "syntax" && (
                <div>
                  {section.content && (
                    <div style={{ background: "#111122", border: `1px solid ${lab.color}33`, borderRadius: 10, padding: 14, marginBottom: 16, fontSize: 13, lineHeight: 1.8, color: "#ccc" }}>
                      {renderContent(section.content)}
                    </div>
                  )}
                  {section.commands?.map((cmd, i) => (
                    <SyntaxBlock key={i} label={cmd.label} code={cmd.code} note={cmd.note} />
                  ))}
                </div>
              )}

              {section.type === "table" && (
                <div style={{ background: "#0d0d1a", borderRadius: 10, overflow: "hidden", border: "1px solid #2a2a3a", marginBottom: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      {section.rows.map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? "#111122" : "#0d0d1a", borderBottom: "1px solid #1a1a2e" }}>
                          <td style={{ padding: "10px 14px", fontFamily: "monospace", color: lab.color, fontSize: 13, fontWeight: 700, minWidth: 130, whiteSpace: "nowrap" }}>{row[0]}</td>
                          <td style={{ padding: "10px 14px", color: "#ccc", fontSize: 13 }}>{row[1]}</td>
                          {row[2] && <td style={{ padding: "10px 14px", fontFamily: "monospace", color: "#888", fontSize: 12 }}>{row[2]}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.type === "comparison" && (
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
                  {section.items.map((item, i) => (
                    <div key={i} style={{ flex: "1 1 180px", background: "#111122", border: `1px solid ${item.color}55`, borderRadius: 10, padding: 16, borderTop: `3px solid ${item.color}` }}>
                      <div style={{ color: item.color, fontWeight: 700, fontFamily: "monospace", fontSize: 14, marginBottom: 8 }}>{item.label}</div>
                      <div style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 16, borderTop: "1px solid #1a1a2e" }}>
                <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  style={{ background: "transparent", border: "1px solid #333", color: activeSection === 0 ? "#444" : "#aaa", borderRadius: 8, padding: "8px 16px", cursor: activeSection === 0 ? "default" : "pointer", fontSize: 13 }}>
                  ← Prev
                </button>
                <span style={{ color: "#555", fontSize: 12, alignSelf: "center" }}>{activeSection + 1} / {lab.sections.length}</span>
                <button
                  onClick={() => activeSection < lab.sections.length - 1 ? setActiveSection(activeSection + 1) : startQuiz()}
                  style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  {activeSection < lab.sections.length - 1 ? "Next →" : "Start Quiz 📝"}
                </button>
              </div>
            </div>
          )}

          {mode === "quiz" && !quizDone && (
            <div style={{ maxWidth: 500, margin: "40px auto", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: lab.color, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>QUESTION {quizIndex + 1} OF {lab.quiz.length}</div>
              <div style={{ fontSize: 18, color: "#fff", lineHeight: 1.6, marginBottom: 30, background: "#111122", padding: "20px 24px", borderRadius: 12, border: `1px solid ${lab.color}44` }}>
                {lab.quiz[quizIndex].q}
              </div>
              
              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)}
                  style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600, boxShadow: `0 4px 14px ${lab.color}44` }}>
                  Reveal Answer 👀
                </button>
              ) : (
                <div style={{ animation: "fadeIn 0.4s ease" }}>
                  <div style={{ fontSize: 15, color: "#e8e8ff", lineHeight: 1.6, background: "#1a1a2e", padding: "20px 24px", borderRadius: 12, borderLeft: `4px solid ${lab.color}`, textAlign: "left", marginBottom: 24 }}>
                    {lab.quiz[quizIndex].a}
                  </div>
                  <button onClick={nextQuestion}
                    style={{ background: "transparent", border: "1px solid #444", color: "#ccc", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                    {quizIndex < lab.quiz.length - 1 ? "Next Question →" : "Finish Quiz 🏆"}
                  </button>
                </div>
              )}
            </div>
          )}

          {mode === "quiz" && quizDone && (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
              <h2 style={{ color: "#fff", marginBottom: 10 }}>Quiz Completed!</h2>
              <p style={{ color: "#aaa", marginBottom: 30 }}>Great job reviewing {lab.title}.</p>
              <button onClick={() => { setMode("learn"); setActiveSection(0); }}
                style={{ background: lab.color, border: "none", color: "#fff", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                Back to Notes 📚
              </button>
            </div>
          )}

        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
