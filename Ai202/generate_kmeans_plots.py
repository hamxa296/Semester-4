import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_samples, silhouette_score

# Set style for professional look
plt.style.use('dark_background')
accent_color = '#38bdf8'
secondary_color = '#818cf8'

def generate_plots():
    # 1. Before and After Plot
    X, y_true = make_blobs(n_samples=300, centers=3, cluster_std=0.60, random_state=42)
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Before
    ax1.scatter(X[:, 0], X[:, 1], s=30, color='gray', alpha=0.5)
    ax1.set_title('Unlabeled Data', fontsize=14, color='white', pad=15)
    ax1.axis('off')
    
    # After
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    y_kmeans = kmeans.fit_predict(X)
    centers = kmeans.cluster_centers_
    
    colors = ['#38bdf8', '#818cf8', '#fb7185']
    for i in range(3):
        ax2.scatter(X[y_kmeans == i, 0], X[y_kmeans == i, 1], s=30, color=colors[i], alpha=0.6)
    
    ax2.scatter(centers[:, 0], centers[:, 1], c='white', s=200, marker='*', edgecolors='black', label='Centroids')
    ax2.set_title('K-Means Clustered (K=3)', fontsize=14, color='white', pad=15)
    ax2.axis('off')
    
    plt.tight_layout()
    plt.savefig('kmeans_before_after.png', dpi=150, bbox_inches='tight', transparent=True)
    plt.close()

    # 2. Elbow Method Plot
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42, n_init=10)
        kmeans.fit(X)
        wcss.append(kmeans.inertia_)
    
    plt.figure(figsize=(8, 5))
    plt.plot(range(1, 11), wcss, marker='o', linestyle='-', color=accent_color, linewidth=2, markersize=8)
    plt.title('Elbow Method', fontsize=14, color='white', pad=15)
    plt.xlabel('Number of Clusters (K)', color='#94a3b8')
    plt.ylabel('WCSS', color='#94a3b8')
    plt.grid(color='#334155', linestyle='--', alpha=0.3)
    
    # Highlight Elbow
    plt.annotate('Elbow Point (K=3)', xy=(3, wcss[2]), xytext=(5, wcss[2]*1.5),
                 arrowprops=dict(facecolor='white', shrink=0.05, width=1, headwidth=8))
    
    plt.savefig('elbow_method_plot.png', dpi=150, bbox_inches='tight', transparent=True)
    plt.close()

    # 3. Silhouette Analysis Plot
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    cluster_labels = kmeans.fit_predict(X)
    silhouette_avg = silhouette_score(X, cluster_labels)
    sample_silhouette_values = silhouette_samples(X, cluster_labels)

    plt.figure(figsize=(8, 5))
    y_lower = 10
    for i in range(3):
        ith_cluster_silhouette_values = sample_silhouette_values[cluster_labels == i]
        ith_cluster_silhouette_values.sort()
        size_cluster_i = ith_cluster_silhouette_values.shape[0]
        y_upper = y_lower + size_cluster_i
        
        color = colors[i]
        plt.fill_betweenx(np.arange(y_lower, y_upper), 0, ith_cluster_silhouette_values,
                          facecolor=color, edgecolor=color, alpha=0.7)
        plt.text(-0.05, y_lower + 0.5 * size_cluster_i, str(i))
        y_lower = y_upper + 10

    plt.axvline(x=silhouette_avg, color="white", linestyle="--", label='Average Score')
    plt.title('Silhouette Analysis (K=3)', fontsize=14, color='white', pad=15)
    plt.xlabel('Silhouette Coefficient', color='#94a3b8')
    plt.ylabel('Cluster Label', color='#94a3b8')
    plt.yticks([]) # Clear y-axis ticks
    plt.savefig('silhouette_analysis.png', dpi=150, bbox_inches='tight', transparent=True)
    plt.close()

if __name__ == "__main__":
    generate_plots()
    print("Plots generated successfully.")
