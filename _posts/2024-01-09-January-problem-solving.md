---
layout: post
title: January Problem Solving 
description: Warming up for ICPC
tags: [problem-solving]
usemathjax: true
---

### [Spotify Challenge 2010. Apparatus](https://open.kattis.com/problems/apparatus)

The problem is asking the number of bijective functions $f \colon [n] \to [n]$ such that for the given input $(S_i, T_i)$, $f(S_i) = T_i$. Note that if we can decompose the domain $[n]$ into disjoint sets that are of the form $\bigcap_{i \in I} S_i$, we can simply compute the product of the number of permutations in each disjoint set. We can do this by maintaining the disjoint sets induced by $S_1, \dots, S_{i - 1}$ and inserting a new set $S_i$ can be done in $O(n)$, so the time complexity is $O(n^2)$.

### [BAPC 2017. Ghostbusters](https://www.acmicpc.net/problem/14994)

We can consider the bipartite graph $G$ with rows and columns being the vertices. We find the connected components of $G$, and for each connected component, we compute the maximum spanning tree since if there is a cycle, we can always remove one of the edges to have a higher probability, and we are to find 

$$
\operatorname{argmax}_{T \colon spanning tree} \prod_{e_i \in T} p_i = \operatorname{argmax}_{T \colon spanning tree} \sum_{e_i \in T} \ln p_i
$$

since $\ln$ is monotonic. The time complexity should be $O(E\log E) = O(nm\log nm)$.

### [CodeForces 1553G](https://codeforces.com/contest/1553/problem/G)

Notice that the answer will be at most $2$ since $2 \mid a_i(a_i + 1)$ for any $a_i$, so we can always create two nodes to satisfy the condition. 
Also, we can compute the connected components by storing $i$ in each prime divisor of $a_i$, and for each prime number, we connect all the vertices stored there. This covers when the answer is zero. For the one case, for each $i$, we compute the prime divisors of $a_i(a_i + 1)$ and which connected components it will connect when added: let $S_i$ denote the ids of the connected components. $|S_i| \leq 8$, so we can precompute all the connected component pairs that can be connected with one additional vertex in $O(\binom{8}{2}n)$. 
The overall time complexity will be $O(A + n\log A)$, where $A$ is the maximum possible value of $a_i$.

### [CodeSprint LA 2023. Food Mixing](https://open.kattis.com/contests/j4ce6r/problems/foodmixing?tab=metadata)

The problem statement can be reduced down to:

- Given a set $S$ of 2D points $P_1, \dots, P_n$, check whether $(x, y) \in \operatorname{conv}(S)$.
- If so, output a valid convex combination that results in $(x, y)$. 

This can be done by computing the convex hull of $S$, and check whether $(x, y)$ is in the convex polygon, and if so, split the convex polygon into triangles of the form $Q_1Q_iQ_{i + 1}$, where we can retrieve the coefficients using line intersection. There are some edge cases, such as when the convex polygon is degenerate, but that's Geo for ya. 

### [BOJ 31027. 물고기 게임](https://www.acmicpc.net/problem/31027)

Simple casework.

### [BOJ 31030. 순열과 수열](https://www.acmicpc.net/problem/31030)

We note that for disjoint cycles of $A$, they do not affect the corresponding $B$ values, so we focus on individual cycles. Consider the cycle $i, A_i, A_{A_i}, \dots$. If we set $B_i = k$, $B_{A_i} = A_k$, $B_{A_{A_i}} = A_{A_k}, \dots$, and the only condition that needs to be satisfied is the length of the cycle $k$ is in must divide the cycle length of $i$. For each cycle, we can do this in $O(NC)$, so the solution runs in $O(\sum NC) = O(N^2)$. 

### [Dwango Programming Contest 6th. Cookie Distribution](https://atcoder.jp/contests/dwacon6th-prelims/tasks/dwacon6th_prelims_c)

Application of the so-called "product trick". The product can be viewed as the number of ways to color one cookie red for each child. Let $dp[i][j]$ be the number of ways such that in the first $i$ days, $j$ children get red cookies. The dp recurrence is

$$
dp[i][j] = \sum_{m = 0}^{\min(a_i, j)} dp[i - 1][j - m]\binom{n - j + m}{m}\binom{n - m}{a_i - m}
$$

and the answer is $dp[k][n]$. This can be computed in $O(kn^2)$

### [ABC 231G. Balls in Boxes](https://atcoder.jp/contests/abc231/tasks/abc231_g)

Another application of "product trick". This time, we start with some number of balls, so we first compute the number of ways to color $j$ balls when considering the first $i$ boxes: $dp[i][j]$.

$$
dp[i][j] = dp[i - 1][j] + a[i]dp[i - 1][j - 1]
$$

and then for each $0 \leq m \leq n$, the value $dp[n][m]$ will contribute 

$$
\frac{1}{n^m}dp[n][m]\binom{k}{n - m}(n - m)!n^{k - n + m}
$$

### [CodeForces 1919F1. Wine Factory (Easy Version)](https://codeforces.com/contest/1919/problem/F1)

We can model each water tower as a ReLU function: $f_i(x) = \max(x + a_i - b_i, 0)$, and ReLU functions of the form $g(x) = \max(x + a, 0) + b$ is indeed a monoid (by introducing an artificial identity function), so we can use a segment tree to compute the remaining water which is $seg\[0...n - 1\](0)$. 

### [SWERC 2015. Game of Cards](https://www.acmicpc.net/problem/11683)

Simple Sprague-Grundy theorem application

### [SWERC 2017. Cordan Bleu](https://www.acmicpc.net/problem/15416)

We note that the distance from the restaurant to the wine merchants is included regardless. To match a wine cellar with a courier, it is a weighted bipartite matching which can be solved using MCMF or Hungarian algorithm. The time limit is quite tight. 

### [SWERC 2016. Passwords](https://www.acmicpc.net/problem/13961)

We make an AC-automaton with the blacklisted words, and then propagate the blacklist information through suffix links/children. Then, we can do a dynamic programming with the state being $(len, pos, has\\_low, has\\_up, has\\_num)$. 

### [BOJ 31032. 트리의 개수](https://www.acmicpc.net/problem/31032)

Using indicator variables, we can write the desired sum as the following:

$$
\sum_{j = 1}^{K}g_j(T) = \sum_{j = 1}^{K}\sum_{T'\subseteq T}1 + \sum_{e \in E'}[A_u \leq j \lor A_v \leq j] - \sum_{v \in V'}[A_v \leq j]
$$

All three terms can be computed by first rearranging and then using tree dp, where $dp[u]$ is the number of connected subgraphs that has $u$ as the closest vertex to the root, and $revdp[u]$ is the number of connected subgraphs that includes $par[u]$, and does not include $u$. The recurrences are 

$$
dp[u] = \prod_{i = 1}^k (1 + dp[c_i])
$$

and 

$$
revdp[u] = (revdp[par[u]] + 1) \frac{dp[par[u]]}{1 + dp[u]}
$$

The time complexity is $O(n)$.

### [BOJ 30989. 다항함수의 미분과 나머지](https://www.acmicpc.net/problem/30989)

Essentially, the condition with the kth derivative is:

$$
f^{(k)}(x) = \sum_{i = k}^n (i)_kc_ix^{i - k} = \sum_{j = 0}^d r_jt^j
$$

and $(i)_k \pmod{m}$ can be computed using a segment tree or factorizing $m$ into its prime factors and doing a sliding window, maintaining the power of $p$ and the product that is coprime with $p$. Then, $(i)_kc_i \equiv s_j \pmod{m}$, so we can solve this by extended euclidean algorithm, and find the range of $c_i$. There is a lot of edge cases that we need to consider, which is left as an exercise for the reader.

### [USACO Jan20 Platinum. Minimizing Haybales](https://www.acmicpc.net/problem/24485)

The main observation is that for each $1 \leq i \leq N$, 
the cardinality of the set $S_i := \\{j \in [i - 1] \colon |h_j - h_i| > K\\}$ is invariant under the given operation, so the idea for the solution is to take the smallest $h_i$ that satisfies $|S_i| = 0$, and remove $h_i$ from the remaining $S_j$'s. This can be done via square root decomposition or segment tree.