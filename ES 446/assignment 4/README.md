# ES 446: Assignment 4 - Reaction-Diffusion Equation

This repository contains the complete implementation and derivation for Assignment 4 of ES 446. The project focuses on solving the Reaction-Diffusion equation (Fisher-KPP model) using the **FEniCS** finite element computing platform.

## 📝 Problem Overview

- **Domain**: Unit Square $\Omega = [0, 1] \times [0, 1]$.
- **Equation**: $\frac{\partial u}{\partial t} = D \nabla^2 u + \rho u(1-u)$.
- **Boundary Condition**: $u = 0$ on $\partial \Omega$ (Dirichlet).
- **Initial Condition**: A centered Gaussian pulse $u_0(x,y) = e^{-100((x-0.5)^2 + (y-0.5)^2)}$.
- **Goal**: Derive the weak formulation and implement the time-stepping solution.

## 📁 Project Structure

| File | Description |
| :--- | :--- |
| **`main.py`** | Core FEniCS implementation and simulation script. |
| **`derivation.md`** | Detailed mathematical derivation of the weak problem. |
| **`Dockerfile`** | Containerized environment for reproducible execution. |
| **`assignment_report.md`** | A consolidated report containing all submission requirements. |

## 🚀 Getting Started

### 1. Using Docker (Recommended)
The project is containerized to ensure all FEniCS dependencies are correctly configured. Run the following command in the terminal:

```bash
docker-compose up --build
```

This will:
1. Build the FEniCS environment.
2. Run the simulation (`main.py`).
3. Generate `initial_condition.png` and `final_solution.png` in your local directory.

### 2. Local Setup
If you have FEniCS installed on your system:
```bash
python3 main.py
```

## 📊 Results

The simulation tracks the concentration $u$ over time. You will see the initial high-concentration pulse in the center diffuse outward while reacting with the environment, eventually reaching a state balanced by the zero-value boundary constraints.

---
*Created as part of the ES 446 Coursework.*
