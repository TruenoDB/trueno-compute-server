# Trueno Compute Server
The TruenoDB distributed computation server.


> **Trueno Compute Server**
> Trueno Compute Server relies on Spark Job Server, and GraphX.

> 1. Page Rank Algorithm.
> 2. Connected Components.
> 3. Strongly Connected Components.
> 4. Triangle Counting.

## Spark Compute Server Algorithm Generator
We designed an algorithm generator. The architecture includes connectivity to a key value store in which the parameters of new algorithms will be stored. The algorithm generator will create the **algorithms-release.jar** that will be uploaded into the Spark Job Server in order to receive **REST** requests. The results will be stored in the Database (e.g. Apache Cassandra, Scylla).

## Algorithms set:

All algorithms run on top of graph **G=(V,E)**

| Algorithm type |           Algortihm Set    |
| ---------------| -------------------------------------------------------------------------- |
| Clustering     |      triangles, transitivity, clustering, average_clustering, [trials]      |
| Centrality     |      Degree, Closeness, Betweenness, Flow-Closeness [k, normalized, u, distance, ...]     |
| Clique         |      find_cliques, make_clique_bipartite, number_of_cliques, [nodes, cliques]     |
| Communities    |      k_clique_communities, [k, cliques]      |
| Approximation  |      Clique, Clustering, Domaninating Set, IS, VC       |
| Components     |      Connectivity, Strong Connectivity, Weak Connectivity      |
| Connectivity   |      Flow Based Connectivity, Minimum Cuts, [s, t, u, v]      |
| Cycles         |      simple cycles, [root]      |
| DAG            |      ancestors, descendants, topological sort, is DAG? [source, ...]      |


----------

## Spark Compute Server Algorithm Generator Architecture

<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/TruenoDB/trueno-compute-server/master/assets/images/architecture.png">
</p>

<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/TruenoDB/trueno-compute-server/master/assets/images/ComputeEngineArchitecture.png">
</p>
----------
