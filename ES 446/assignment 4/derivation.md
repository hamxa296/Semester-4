# Reaction-Diffusion Equation: Weak Formulation Derivation

This document provides the step-by-step derivation of the weak formulation for the reaction-diffusion equation used in the FEniCS implementation.

## 1. Strong Form
We consider the following parabolic partial differential equation (PDE) on a domain $\Omega$ with Dirichlet boundary conditions:

$$ \frac{\partial u}{\partial t} - D \nabla^2 u = f(u) \quad \text{in } \Omega $$
$$ u = 0 \quad \text{on } \partial \Omega $$
$$ u(x, y, 0) = u_0(x, y) \quad \text{initial condition} $$

where:
- $u(x, y, t)$ is the concentration/quantity.
- $D$ is the diffusion coefficient.
- $f(u)$ is the reaction term (e.g., $u(1-u)$ for Fisher-KPP).

## 2. Time Discretization
Using the **Implicit Euler** (Backward Euler) method for the diffusion term and an **Explicit** treatment for the reaction term (semi-implicit scheme) to keep the problem linear at each step:

$$ \frac{u^{n+1} - u^n}{\Delta t} - D \nabla^2 u^{n+1} = f(u^n) $$

Rearranging for terms at $t^{n+1}$:
$$ u^{n+1} - \Delta t D \nabla^2 u^{n+1} = u^n + \Delta t f(u^n) $$

## 3. Weak Formulation
To derive the weak form, we multiply by a test function $v \in V$, where $V$ is a Sobolev space $H_0^1(\Omega)$ (functions that vanish on the boundary).

Integrate over the domain $\Omega$:
$$ \int_\Omega u^{n+1} v \, dx - \Delta t D \int_\Omega (\nabla^2 u^{n+1}) v \, dx = \int_\Omega (u^n + \Delta t f(u^n)) v \, dx $$

### Integration by Parts
Apply Green's first identity to the Laplacian term:
$$ -\int_\Omega (\nabla^2 u^{n+1}) v \, dx = \int_\Omega \nabla u^{n+1} \cdot \nabla v \, dx - \int_{\partial \Omega} \frac{\partial u^{n+1}}{\partial n} v \, ds $$

Since $v = 0$ on $\partial \Omega$ (due to Dirichlet boundary conditions), the boundary integral vanishes:
$$ -\int_\Omega (\nabla^2 u^{n+1}) v \, dx = \int_\Omega \nabla u^{n+1} \cdot \nabla v \, dx $$

### Final Variational Form
Substituting back into the integral equation:
$$ \int_\Omega u^{n+1} v \, dx + \Delta t D \int_\Omega \nabla u^{n+1} \cdot \nabla v \, dx = \int_\Omega u^n v \, dx + \Delta t \int_\Omega f(u^n) v \, dx $$

In FEniCS notation ($a(u, v) = L(v)$):
- **Bilinear form $a$**:
  $$ a(u, v) = \int_\Omega (u v + \Delta t D \nabla u \cdot \nabla v) \, dx $$
- **Linear functional $L$**:
  $$ L(v) = \int_\Omega (u^n + \Delta t f(u^n)) v \, dx $$

This linear system is solved at every time step to find $u^{n+1}$ from $u^n$.
