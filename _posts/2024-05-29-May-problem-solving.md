---
layout: post
title: May Problem-solving
description: Stimulating problems as always
tags: [problem-solving]
usemathjax: true
---


### [TOKI TROC14. Tree Game](https://tlx.toki.id/problems/troc-14/H/)

The idea is quite simple - in a line case, the problem reduces to range flip which can be done with a lazy segment tree, so we can use HLD + subtree queries (by ordering the heavy child first), and we maintain a slack variable that stores the light children sum. Note that computing $cnt[u]$, the number of white nodes in a subtree is straightforward, so we can manually compute it for the node and its heavy child, and we subtract by the slack variable, so when updating the path, we would first subtract the corresponding value for each light edge we go up, update the path, and then add back the values for the light edge. The time complexity would be $O(Q\log^2 N)$. 

P.S. I had a major bug in my code that computed the subtree size wrong, but somehow it passed 10 tests... 

### [SEERC 2019A. Max or Min](https://www.acmicpc.net/problem/17955)

The idea is quite simple - for a fixed target value $x$, the only thing we care about each number is whether they are greater or less than $x$, and then, since the array is circular, we will always have a closed interval with the left and right endpoints being $x$, and after flipping some number first, the number of operations needed is simply the size of the interval plus the number of contiguous intervals of the same type. This can be nicely maintained using a segment tree storing $2 \times 2$ matrices.

### [NWERC 2009I. Simple Polygon](https://www.acmicpc.net/problem/3679)

Convex Hull problem. The idea is that if we get a lower convex hull, every other point will lie nicely above it, so we can sort them by the x-coordinate and append it.

### [ICPC Korea Prelim 2014E. Highway](https://www.acmicpc.net/problem/10254)

Rotating Calipers. Note that unlike the furthest point away from a line can be found by ternary search since the distance is convex, given that all the points are on one side of the line, the furthest point away from a point is **not** convex!! Hence, we have to resort to comparing angles until we get angles closest to opposite. Note that we don't move the calipers when they are parallel?

### [IOI 2013. Dreaming](https://www.acmicpc.net/problem/8872)

Tree DP + Greedy. We can easily prove that for the newly added edges, it is never optimal to have different endpoints for a tree in the forest. Thus, we only have to consider which vertices will connect to different trees. Then, within the tree, the only thing that matters is its diameter, and the vertex that minimizes the maximum distance from itself. Suppose we have $k$ trees, each with maximum distance $d_1 \le d_2 \le \ldots d_k$. We can prove that it is always optimal to connect $T_k$ with rest of the trees like a star.

### [BOJ 13974. 파일 합치기 2](https://www.acmicpc.net/problem/13974)

Knuth Optimization. The main idea is that if $opt[i][j]$ is the optimum for an interval $[i, j]$ and the cost array satisfies monge array and $C[a][d] \ge C[b][c]$ for $a \le b \le c \le d$, we have that

$$
opt[i][j - 1] \le opt[i][j] \le opt[i + 1][j]
$$

which allows us to iterate in increasing order of interval length to get $O(N^2)$.

### [ARC 74F. Lotus Leaves](https://atcoder.jp/contests/arc074/tasks/arc074_d)

Idea is modeling leaves as an edge between a row and a column, and then we can see that this problem reduces to a minimum cut problem. Beware that the source and sink in this case should be a union of a row and a column, but otherwise a very standard flow problem, with a very chill bound.

### [BOI 2009. Beetle](https://www.acmicpc.net/problem/2419)

Range DP. Very cool idea - instead of thinking about the maximum amount of water the beetle can get, we think about the complement; the minimum number of water to be wasted. Even then, it is somewhat unclear what the DP would look like. Thus, we fix the number of dews to visit to drink - let it be $k$. Then, if we move $x$ distance, the amount of water will decrease by $kx$. 

### [BOJ 11001. 김치](https://www.acmicpc.net/problem/11001)

DnC Optimization. Since the value we are optimizing for forms a Monge array, it is trivial.

### [BOJ 14560. Communism](https://www.acmicpc.net/problem/14560)

MITM + Merge sorting. $O(n\times 3^{n / 2})$ doesn't pass, so we must sort smartly - each stage we either add $-x[i]$, $0$, $x[i]$, so we only have to merge these three arrays fast which can be done in a merge sorting fashion, $T(n) = T(n / 3) + O(3^n)$, so $T(n) = O(3^n)$.

### [BOJ 17526. Star Trek](https://www.acmicpc.net/problem/17526)

Since the slopes are in arbitrary order for the dp in the increasing direction, we consider the reverse direction dp, where $dp[i]$ covers $[i, N]$. Then, we can see the slopes are in monotonic order, so we can do a simple CHT DP in $O(N\log N)$.

### [CodeForces 1740F. Conditional Mix](https://codeforces.com/contest/1740/problem/F)

DP. Using Gale-Ryser Theorem, we can see that the necessary and sufficient condition for a multiset with $r_1 \ge \ldots \ge r_n$ is when for each prefix $k$, the following satisfies:

$$
\sum_{i = 1}^k r_i \le \sum_{j = 1}^n \min(k, f_j)
$$

Then, we can define the dp state to be $(pos, sum, last)$ and then note that the number of values that can be last for a give pos is $\frac{n}{pos} + 1$, so using prefix sum, the dp can be done in $O(n^2\log n)$.

