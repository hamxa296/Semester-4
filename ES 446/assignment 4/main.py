import fenics as fe
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 1. Mesh and Function Space
# Use a higher resolution mesh for better visualization of diffusion patterns
mesh = fe.UnitSquareMesh(64, 64)
V = fe.FunctionSpace(mesh, 'P', 1)

# 2. Boundary Conditions
# Dirichlet boundary condition: u=0 on the entire boundary
def boundary(x, on_boundary):
    return on_boundary

bc = fe.DirichletBC(V, fe.Constant(0.0), boundary)

# 3. Initial Condition
# We use a more interesting initial condition: a Gaussian pulse in the center
# u0(x,y) = exp(-100 * ((x-0.5)^2 + (y-0.5)^2))
u_0_expr = fe.Expression('exp(-100*(pow(x[0]-0.5, 2) + pow(x[1]-0.5, 2)))', degree=2)
u_n = fe.interpolate(u_0_expr, V)

# 4. Parameters
T = 2.0            # Final time
num_steps = 100    # Number of time steps
dt = T / num_steps # Time step size
D = 0.01           # Diffusion coefficient
rho = 5.0          # Reaction rate (Fisher-KPP coefficient)

# 5. Variational Problem (Weak Form)
# u: Trial function (u^{n+1})
# v: Test function
u = fe.TrialFunction(V)
v = fe.TestFunction(V)

# Reaction term f(u) = rho * u * (1 - u)
# We treat the reaction term explicitly for linearity at each step
def f(u_prev):
    return rho * u_prev * (1.0 - u_prev)

# Bilinear form a(u, v) and linear form L(v)
# Derivation: (u^{n+1} - u^n)/dt - D*grad^2(u^{n+1}) = f(u^n)
# Multiply by v and integrate by parts:
# <u, v> + dt*D*<grad(u), grad(v)> = <u_n, v> + dt*<f(u_n), v>
a = (u * v + dt * D * fe.dot(fe.grad(u), fe.grad(v))) * fe.dx
L = (u_n + dt * f(u_n)) * v * fe.dx

# 6. Time-stepping and Solving
u_sol = fe.Function(V)

# Plot Initial Condition
plt.figure(figsize=(8, 6))
p = fe.plot(u_n)
plt.colorbar(p)
plt.title("Initial Condition: $u_0(x,y)$")
plt.savefig("initial_condition.png")
plt.close()

print("Starting time evolution...")
for n in range(num_steps):
    # Solve linear system
    fe.solve(a == L, u_sol, bc)
    
    # Update previous solution
    u_n.assign(u_sol)
    
    # Progress feedback
    if (n + 1) % 20 == 0:
        print(f"Step {n+1}/{num_steps} completed.")

# 7. Final Plots
plt.figure(figsize=(8, 6))
p = fe.plot(u_sol)
plt.colorbar(p)
plt.title(f"Final Solution at T={T}")
plt.savefig("final_solution.png")
plt.close()

print("Simulation finished. Plots saved as 'initial_condition.png' and 'final_solution.png'.")