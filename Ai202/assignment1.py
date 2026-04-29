import heapq

grid = [
  [0,0,0,0,1,0,0,0],
  [0,1,1,0,1,0,1,0],
  [0,0,0,0,0,0,1,0],
  [0,1,0,1,1,0,0,0],
  [0,1,0,0,0,1,1,0],
  [0,0,0,1,0,0,0,0],
  [1,1,0,1,0,1,0,1],
  [0,0,0,0,0,0,0,0]
]

start = (0, 0)
goal = (7, 7)

def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def astar():
    pq = []
    heapq.heappush(pq, (0, start))
    
    came_from = {}
    g = {start: 0}
    nodes_expanded = 0
    closed_set = set()

    while pq:
        f_score, current = heapq.heappop(pq)
        
        if current in closed_set:
            continue
            
        nodes_expanded += 1

        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path, g[goal], nodes_expanded

        closed_set.add(current)

        for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
            nx, ny = current[0] + dx, current[1] + dy

            if 0 <= nx < 8 and 0 <= ny < 8 and grid[nx][ny] == 0:
                neighbor = (nx, ny)
                new_cost = g[current] + 1

                if neighbor not in g or new_cost < g[neighbor]:
                    g[neighbor] = new_cost
                    f = new_cost + heuristic(neighbor, goal)
                    heapq.heappush(pq, (f, neighbor))
                    came_from[neighbor] = current

    return None, None, nodes_expanded


def print_grid(grid, path):
    path_set = set(path) if path else set()
    print("\nGrid Visualization:")
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if (r, c) == start:
                print("S", end=" ")
            elif (r, c) == goal:
                print("G", end=" ")
            elif (r, c) in path_set:
                print("*", end=" ")
            elif grid[r][c] == 1:
                print("#", end=" ")
            else:
                print(".", end=" ")
        print()
    print("\nLegend: S=Start, G=Goal, *=Path, #=Obstacle, .=Empty\n")


path, cost, nodes = astar()

if path:
    print("Path Found!")
    print("Cost:", cost)
    print("Nodes Expanded:", nodes)
    print_grid(grid, path)
else:
    print("No path exists")