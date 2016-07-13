# trueno-compute-server
The Trueno distribute computation server.


> **Trueno Compute Server**
> Trueno Compute Server relies on Spark Job Server, and GraphX.

> [X]. Page Rank Algorithm.
> [X]. Connected Components.
> [X]. Strongly Connected Components.
> [X]. Triangle Counting.

## Spark Compute Server Algorithm Generator
We design an algorithm generator that will include connectivity to a key value store in which the parameters of new algorithms will be stored. The algorithm generator will create a **algorithms-release.jar** that will be uploaded into the Spark Job Server in order to receive REST requests. The results will be stored in the Database.

## Algorithms set:

All algorithms run on top of graph **G**

| Algorithm type |           Algortihm Set    |
| ---------------| -------------------------------------------------------------------------- |
| Clustering     |      triangles, transitivity, clustering, averga_clustering, [trials]      |
| Centrality     |      Degree, Closeness, Betweenness, Flow-Closeness [k, normalized, u, distance, ...]     |
| Clique         |      find_cliques, make_clique_bipartite, number_of_cliques, [nodes, cliques]     |
| Communities    |      k_clique_communities, [k, cliques]      |
| Approximation  |      Clique, Clustering, Domaninating Set, IS, VC       |
| Components     |      Connectivity, Strong Connectivity, Weak Connectivity      |
| Connectivity   |      Flow Based Connectivity, Minimum Cuts, [s,t, u, v]      |
| Cycles         |      simple cycles, [root]      |
| DAG            |      ancestors, descendants, topological sort, is DAG? [source, ...]      |


----------

## Spark Compute Server Algorithm Generator Architecture

<p align="center">
  <img height="400" src="https://raw.githubusercontent.com/TruenoDB/trueno-compute-server/master/assets/images/architecture.png">
</p>

----------