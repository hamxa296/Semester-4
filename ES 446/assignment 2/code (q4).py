import sympy as sp

x, y, z = sp.symbols('x y z')
f = 2*x + 3*x*y + 2*z**2
g = sp.Matrix([2*x, 3*x*y, 2*z**2])
pt = {x: 1, y: 2, z: 3}

# Gradient of f
grad_f = [sp.diff(f, v).subs(pt) for v in (x, y, z)]

# Divergence of g
div_g = (sp.diff(g[0], x) + sp.diff(g[1], y) + sp.diff(g[2], z)).subs(pt)

# Curl of g
curl_g = sp.Matrix([
    sp.diff(g[2], y) - sp.diff(g[1], z), 
    sp.diff(g[0], z) - sp.diff(g[2], x), 
    sp.diff(g[1], x) - sp.diff(g[0], y)
]).subs(pt)

print(f"Grad f: {grad_f}, Div g: {div_g}, Curl g: {curl_g}")