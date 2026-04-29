import random
import matplotlib.pyplot as plt

cities = ["A","B","C","D","E"]

dist = {
 ("A","B"):12, ("A","C"):10, ("A","D"):19, ("A","E"):8,
 ("B","C"):3, ("B","D"):7, ("B","E"):6,
 ("C","D"):2, ("C","E"):20,
 ("D","E"):4
}

def get_dist(a,b):
    return dist.get((a,b), dist.get((b,a)))

def fitness(path):
    return sum(get_dist(path[i], path[i+1]) for i in range(len(path)-1))

def tournament(pop):
    return min(random.sample(pop, 3), key=fitness)

def crossover(p1, p2):
    cut = 3
    child = p1[:cut] + [c for c in p2 if c not in p1[:cut]]
    return child

def mutate(path):
    if random.random() < 0.05:
        i,j = random.sample(range(5),2)
        path[i], path[j] = path[j], path[i]
    return path

population = []
for _ in range(20):
    p = cities[:]
    random.shuffle(p)
    population.append(p)

best_fitness = []

for gen in range(100):
    new_pop = []
    for _ in range(20):
        p1 = tournament(population)
        p2 = tournament(population)
        child = mutate(crossover(p1,p2))
        new_pop.append(child)

    population = new_pop
    best = min(population, key=fitness)
    best_fitness.append(fitness(best))

    if gen % 20 == 0:
        print("Gen", gen, best, fitness(best))

plt.plot(best_fitness)
plt.xlabel("Generation")
plt.ylabel("Fitness")
plt.show()