import numpy as np
import matplotlib.pyplot as plt

# Set seed for reproducibility
np.random.seed(42)

# Training data (XOR)
X = np.array([[0,0],[0,1],[1,0],[1,1]])
y = np.array([[0],[1],[1],[0]])

# Activation functions
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def dsigmoid(x):
    # Note: x here is the output of the sigmoid function
    return x * (1 - x)

# Initialize weights and biases
W1 = np.random.randn(2, 4)
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1)
b2 = np.zeros((1, 1))

lr = 0.5
epochs = 10000
losses = []

# Training loop
for epoch in range(epochs):
    # Forward pass
    hidden_layer_input = np.dot(X, W1) + b1
    hidden_layer_output = sigmoid(hidden_layer_input)
    
    output_layer_input = np.dot(hidden_layer_output, W2) + b2
    predicted_output = sigmoid(output_layer_input)

    # Loss calculation (MSE)
    loss = np.mean((y - predicted_output)**2)
    losses.append(loss)

    # Backpropagation
    error = predicted_output - y
    d_predicted_output = error * dsigmoid(predicted_output)
    
    error_hidden_layer = np.dot(d_predicted_output, W2.T)
    d_hidden_layer = error_hidden_layer * dsigmoid(hidden_layer_output)

    # Update weights and biases
    W2 -= lr * np.dot(hidden_layer_output.T, d_predicted_output)
    b2 -= lr * np.sum(d_predicted_output, axis=0, keepdims=True)
    
    W1 -= lr * np.dot(X.T, d_hidden_layer)
    b1 -= lr * np.sum(d_hidden_layer, axis=0, keepdims=True)

# Final predictions after training
print("Final Predictions for XOR:")
for i in range(len(X)):
    print(f"Input: {X[i]} -> Target: {y[i][0]} -> Prediction: {predicted_output[i][0]:.4f}")

# Plotting
plt.figure(figsize=(12, 5))

# Subplot 1: Training Loss Curve
plt.subplot(1, 2, 1)
plt.plot(losses)
plt.title("Training Loss Curve")
plt.xlabel("Epoch")
plt.ylabel("MSE Loss")

# Subplot 2: Decision Boundary
plt.subplot(1, 2, 2)

# Create a mesh grid
xx, yy = np.meshgrid(np.linspace(-0.5, 1.5, 100), np.linspace(-0.5, 1.5, 100))
grid_points = np.c_[xx.ravel(), yy.ravel()]

# Forward pass for the grid
h_grid = sigmoid(np.dot(grid_points, W1) + b1)
out_grid = sigmoid(np.dot(h_grid, W2) + b2)
out_grid = out_grid.reshape(xx.shape)

# Plot decision boundary regions
plt.contourf(xx, yy, out_grid, levels=20, cmap='RdYlBu', alpha=0.8)
plt.colorbar(label='Network Output')

# Scatter training points
for i in range(len(X)):
    color = 'blue' if y[i] == 1 else 'red'
    plt.scatter(X[i, 0], X[i, 1], c=color, edgecolors='k', s=100, label=f"Class {y[i][0]}" if i < 2 else "")

plt.title("Decision Boundary")
plt.xlabel("Input 1")
plt.ylabel("Input 2")
plt.tight_layout()
plt.show()