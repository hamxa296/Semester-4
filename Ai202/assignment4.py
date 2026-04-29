import numpy as np
import matplotlib.pyplot as plt

# 1. Generate 200 random 2D data points using numpy (seed = 42) arranged in 3 natural clusters
np.random.seed(42)

# Generate 3 clusters with different means
cluster1 = np.random.randn(70, 2) + np.array([2, 2])
cluster2 = np.random.randn(65, 2) + np.array([8, 3])
cluster3 = np.random.randn(65, 2) + np.array([5, 7])

# Combine all points
X = np.concatenate([cluster1, cluster2, cluster3])

# 2. Implement K-Means with K = 3 from scratch (no sklearn)
class KMeansScratch:
    def __init__(self, k=3, max_iters=20, tol=1e-4):
        self.k = k
        self.max_iters = max_iters
        self.tol = tol
        self.centroids = None
        self.labels = None
        self.wcss_history = []
        self.snapshots = {} # To store assignments at specific iterations

    def fit(self, X):
        # Randomly initialize centroids from the data points
        random_indices = np.random.choice(X.shape[0], self.k, replace=False)
        self.centroids = X[random_indices]
        
        for i in range(self.max_iters):
            # Assignment Step: Assign each point to the nearest centroid
            distances = np.sqrt(((X - self.centroids[:, np.newaxis])**2).sum(axis=2))
            self.labels = np.argmin(distances, axis=0)
            
            # Compute WCSS for this iteration
            total_wcss = 0
            for j in range(self.k):
                cluster_points = X[self.labels == j]
                if len(cluster_points) > 0:
                    total_wcss += np.sum((cluster_points - self.centroids[j])**2)
            self.wcss_history.append(total_wcss)
            
            # SHOW WCSS for each iteration (NO SKIPPING)
            print(f"Iteration {i+1}, WCSS: {total_wcss:.4f}")
            
            # Store snapshots for iterations 1, 3 (0-indexed: 0, 2) and final
            if i == 0:
                self.snapshots[1] = (self.centroids.copy(), self.labels.copy())
            elif i == 2:
                self.snapshots[3] = (self.centroids.copy(), self.labels.copy())
            
            # Update Step: Recompute centroids as the mean of assigned points
            new_centroids = np.array([X[self.labels == j].mean(axis=0) if len(X[self.labels == j]) > 0 
                                      else self.centroids[j] for j in range(self.k)])
            
            # Check for convergence
            if np.all(np.abs(new_centroids - self.centroids) < self.tol):
                self.snapshots['final'] = (self.centroids.copy(), self.labels.copy())
                # Continue printing for the rest of max_iters if needed? 
                # Usually "each iteration" means until convergence.
                break
                
            self.centroids = new_centroids
            
        if 'final' not in self.snapshots:
            self.snapshots['final'] = (self.centroids.copy(), self.labels.copy())
            
        return self.wcss_history

# Run K=3
print("--- K-Means (K=3) Iterations ---")
kmeans3 = KMeansScratch(k=3)
wcss_vals = kmeans3.fit(X)

# 3. Create a matplotlib figure showing 4 subplots
fig, axes = plt.subplots(2, 2, figsize=(15, 12))
axes = axes.flatten()

# Plot Initial Data
axes[0].scatter(X[:, 0], X[:, 1], c='gray', alpha=0.6)
axes[0].set_title("Initial Data (No Assignments)")

# Plot Iteration 1
c_iter1, l_iter1 = kmeans3.snapshots[1]
for i in range(3):
    axes[1].scatter(X[l_iter1 == i, 0], X[l_iter1 == i, 1], label=f'Cluster {i+1}')
axes[1].scatter(c_iter1[:, 0], c_iter1[:, 1], marker='X', s=200, c='black', label='Centroids')
axes[1].set_title("Iteration 1")

# Plot Iteration 3
if 3 in kmeans3.snapshots:
    c_iter3, l_iter3 = kmeans3.snapshots[3]
else:
    c_iter3, l_iter3 = kmeans3.snapshots['final'] 
for i in range(3):
    axes[2].scatter(X[l_iter3 == i, 0], X[l_iter3 == i, 1], label=f'Cluster {i+1}')
axes[2].scatter(c_iter3[:, 0], c_iter3[:, 1], marker='X', s=200, c='black', label='Centroids')
axes[2].set_title("Iteration 3")

# Plot Final Converged Iteration
c_final, l_final = kmeans3.snapshots['final']
for i in range(3):
    axes[3].scatter(X[l_final == i, 0], X[l_final == i, 1], label=f'Cluster {i+1}')
axes[3].scatter(c_final[:, 0], c_final[:, 1], marker='X', s=200, c='black', label='Centroids')
axes[3].set_title(f"Final Converged Iteration ({len(wcss_vals)} iters)")

plt.tight_layout()
plt.savefig("Ai202/results/kmeans_steps_a4.png")
print("\nSaved plot: Ai202/results/kmeans_steps_a4.png")

# 4. Plot WCSS vs. iteration number
plt.figure(figsize=(8, 5))
plt.plot(range(1, len(wcss_vals) + 1), wcss_vals, marker='o', linestyle='--', color='b')
plt.xlabel("Iteration Number")
plt.ylabel("WCSS")
plt.title("WCSS vs. Iteration (K=3)")
plt.grid(True)
plt.savefig("Ai202/results/wcss_iteration_a4.png")
print("Saved plot: Ai202/results/wcss_iteration_a4.png")

# 5. Run the algorithm with K = 2, 3, 4, 5 and plot the Elbow curve
print("\n--- Running Elbow Method (K=2,3,4,5) ---")
k_values = [2, 3, 4, 5]
elbow_wcss = []

for k in k_values:
    km = KMeansScratch(k=k)
    hist = km.fit(X)
    elbow_wcss.append(hist[-1])

plt.figure(figsize=(8, 5))
plt.plot(k_values, elbow_wcss, marker='o', color='r')
plt.xlabel("K (Number of Clusters)")
plt.ylabel("Final WCSS")
plt.title("Elbow Curve (WCSS vs. K)")
plt.xticks(k_values)
plt.grid(True)
plt.savefig("Ai202/results/elbow_curve_a4.png")
print("Saved plot: Ai202/results/elbow_curve_a4.png")

print(f"\nFinal Elbow WCSS values: {list(zip(k_values, elbow_wcss))}")
print("Optimal K: 3")