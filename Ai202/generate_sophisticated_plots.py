import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score

# Data from LaTeX
np.random.seed(42)
X1 = np.random.randn(70,2) + [2,2]
X2 = np.random.randn(70,2) + [8,8]
X3 = np.random.randn(60,2) + [5,0]
X = np.vstack((X1,X2,X3))

def generate_better_plots():
    # Set a very clean, sophisticated style
    plt.style.use('seaborn-v0_8-paper')
    matplotlib.rcParams['font.family'] = 'sans-serif'
    matplotlib.rcParams['font.sans-serif'] = ['Helvetica', 'Arial', 'sans-serif']
    matplotlib.rcParams['axes.spines.top'] = False
    matplotlib.rcParams['axes.spines.right'] = False
    matplotlib.rcParams['axes.linewidth'] = 0.8
    matplotlib.rcParams['text.color'] = '#333333'
    matplotlib.rcParams['axes.labelcolor'] = '#333333'
    matplotlib.rcParams['xtick.color'] = '#666666'
    matplotlib.rcParams['ytick.color'] = '#666666'

    # K-Means model
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    labels = kmeans.fit_predict(X)

    # 1. Elegant Silhouette Plot
    silhouette_avg = silhouette_score(X, labels)
    sample_silhouette_values = silhouette_samples(X, labels)
    
    fig, ax1 = plt.subplots(figsize=(8, 5), dpi=300)
    ax1.set_xlim([-0.1, 1])
    ax1.set_ylim([0, len(X) + (3 + 1) * 10])

    y_lower = 10
    # Sophisticated color palette
    colors = ['#5e81ac', '#ebcb8b', '#a3be8c'] 

    for i in range(3):
        ith_cluster_silhouette_values = sample_silhouette_values[labels == i]
        ith_cluster_silhouette_values.sort()
        size_cluster_i = ith_cluster_silhouette_values.shape[0]
        y_upper = y_lower + size_cluster_i

        ax1.fill_betweenx(np.arange(y_lower, y_upper), 0, ith_cluster_silhouette_values,
                          facecolor=colors[i], edgecolor="none", alpha=0.8)
        # Label clusters at the middle
        ax1.text(-0.05, y_lower + 0.5 * size_cluster_i, str(i + 1), color="#333333", fontweight='bold')
        y_lower = y_upper + 10

    ax1.set_title("Silhouette Analysis for K-Means (K=3)", fontsize=14, pad=20, fontweight='bold')
    ax1.set_xlabel("Silhouette Coefficient Values", fontsize=12, labelpad=10)
    ax1.set_ylabel("Cluster Label", fontsize=12, labelpad=10)
    ax1.axvline(x=silhouette_avg, color="#bf616a", linestyle="--", linewidth=1.5, label=f"Average: {silhouette_avg:.2f}")
    ax1.set_yticks([])  # Clear the yaxis labels / ticks
    ax1.legend(loc="upper right", frameon=False)
    
    plt.tight_layout()
    plt.savefig('silhouette_latex_new.png', bbox_inches='tight', transparent=True)
    plt.close()

if __name__ == "__main__":
    generate_better_plots()
    print("New silhouette plot generated.")
