# Assignment 4: Reaction-Diffusion Equation with FEniCS

This assignment implements the Reaction-Diffusion equation on a unit square domain using the FEniCS computing platform.

## Files Included
1.  **`main.py`**: The Python implementation using FEniCS.
2.  **`derivation.md`**: Step-by-step mathematical derivation of the weak formulation.
3.  **`Dockerfile`**: Container configuration to run the FEniCS environment.
4.  **`docker-compose.yml`**: Easy execution script for Docker.

## Problem Description
- **Domain**: Unit Square $\Omega = [0, 1] \times [0, 1]$.
- **Equation**: $\frac{\partial u}{\partial t} = D \nabla^2 u + \rho u(1-u)$ (Fisher-KPP).
- **Boundary Condition**: $u = 0$ on $\partial \Omega$ (Dirichlet).
- **Initial Condition**: Gaussian pulse $u_0(x,y) = \exp(-100((x-0.5)^2 + (y-0.5)^2))$.

## How to Run

### Option 1: Using Docker (Recommended)
Ensure you have Docker and Docker Compose installed, then run:

```bash
docker-compose up --build
```

The plots (`initial_condition.png` and `final_solution.png`) will be generated in the current directory.

### Option 2: Local Installation
If you have FEniCS installed locally:

```bash
python3 main.py
```

## Results
The simulation solves the PDE over time, showing how the initial concentration pulse diffuses across the domain while reacting, eventually being constrained by the zero-value boundary conditions.
