import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score

# Data from LaTeX Question 4
np.random.seed(42)
X1 = np.random.randn(70,2) + [2,2]
X2 = np.random.randn(70,2) + [8,8]
X3 = np.random.randn(60,2) + [5,0]
X = np.vstack((X1,X2,X3))

def generate_latex_plots():
    plt.style.use('default') # Back to white background for "exact" look if it's from a paper
    # Or keep it clean. Let's use a standard white background for "formal" look.
    
    # 1. Clustering Steps (Before/After)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
    ax1.scatter(X[:,0], X[:,1], c='gray', s=20)
    ax1.set_title("Initial Data Points")
    
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X)
    centroids = kmeans.cluster_centers_
    
    ax2.scatter(X[:,0], X[:,1], c=labels, cmap='viridis', s=20)
    ax2.scatter(centroids[:,0], centroids[:,1], c='red', marker='x', s=100, label='Centroids')
    ax2.set_title("K-Means Result (K=3)")
    ax2.legend()
    plt.tight_layout()
    plt.savefig('kmeans_steps.png')
    plt.close()

    # 2. WCSS Plot (Elbow)
    wcss = []
    for i in range(1, 11):
        km = KMeans(n_clusters=i, init='k-means++', random_state=42, n_init=10)
        km.fit(X)
        wcss.append(km.inertia_)
    
    plt.figure(figsize=(8, 4))
    plt.plot(range(1, 11), wcss, 'bx-')
    plt.title('WCSS vs Number of Clusters (Elbow Method)')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS')
    plt.savefig('wcss_iteration_a4.png')
    plt.close()

    # 3. Silhouette (User requested slide, but using LaTeX data)
    silhouette_avg = silhouette_score(X, labels)
    sample_silhouette_values = silhouette_samples(X, labels)
    
    plt.figure(figsize=(8, 4))
    y_lower = 10
    for i in range(3):
        ith_cluster_silhouette_values = sample_silhouette_values[labels == i]
        ith_cluster_silhouette_values.sort()
        size_cluster_i = ith_cluster_silhouette_values.shape[0]
        y_upper = y_lower + size_cluster_i
        plt.fill_betweenx(np.arange(y_lower, y_upper), 0, ith_cluster_silhouette_values, alpha=0.7)
        y_lower = y_upper + 10
    plt.axvline(x=silhouette_avg, color="red", linestyle="--")
    plt.title("Silhouette Analysis for K=3")
    plt.savefig('silhouette_latex.png')
    plt.close()

if __name__ == "__main__":
    generate_latex_plots()
    print("LaTeX-style plots generated.")
