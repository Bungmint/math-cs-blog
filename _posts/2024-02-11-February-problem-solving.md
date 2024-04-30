---
layout: post
title: February Problem Solving 
description: Final stretch for ICPC Regionals
tags: [problem-solving]
usemathjax: true
---

### [CodeForces 1922F. Replace on Segment](https://codeforces.com/contest/1922/problem/F)

Note that we should never do two operations that intersect: $[l_1, r_1]$, $[l_2, r_2]$, $l_1 \le l_2 \le r_1 \le r_2$. Then, we can compute the dp recurrence for $f(l, r, k)$, $g(l, r, k)$ where $f$ is the minimum number of operation for the segment $[l, r]$ to be equal to $k$, $g$ is the minimum number of operation for the segment $[l, r]$ to be all different from $k$. This results in an $O(n^4)$ dp.

### [CCO 2018. Boring Lectures](https://www.acmicpc.net/problem/19634)

Offline deletion + Segment tree. We can use the idea used in offline dynamic connectivity, but we cannot naively do this since $N \le 10^6$, so it would result in $O(N\log N\log Q)$ which is too much, so we note that only $Q$ values are updated, so we only change those values, and leave the $N - Q$ values, compute the values for them before and do the offline dynamic connectivity style divide and conquer which results in $O(N\log N + Q\log N\log Q)$ which fits in the TL.

### [별 보러 가자](https://www.acmicpc.net/problem/31227)

Recall for Manhattan distance:

$$
|x_1 - x_2| + |y_1 - y_2| = \max(x_1 + y_1 - (x_2 + y_2), -(x_1 + y_1) + (x_2 + y_2), x_1 - y_1 - (x_2 - y_2), x_2 - y_2 - (x_1 - y_1))
$$

then, we can compute $dp[N][M]$, the maximum value of sum of $R_i$ over $N$ days, $M$ observations in $O(NM)$ by realizing that suboptimal values will always be smaller due to the $\max$ operator.

### [All Colourings](https://open.kattis.com/problems/allcolourings)

Computing the values directly is hard, so we compute the values $dp[mask]$ - the number of ways satisfying at least the edges in the mask which is trivial - DSU/DFS and then simply $K^{CC}$. Then, we can do a Möbius transformation to retrieve the $dp'[mask]$ - the number of ways satisfying exactly the edges in the mask.

### [CERC 2016. Easy Equation](https://www.acmicpc.net/problem/13949)

Vieta jumping + BFS. 

### [CodeForces 1919F2. Wine Factory (Hard Version)](https://codeforces.com/contest/1919/problem/F2)

Note that we can model this problem as a flow problem with each water tower $i$ has an incoming edge from the source with capacity $a_i$ and outgoing edge to a sink with capacity $b_i$, and tower $i$ has an edge to $i + 1$ with capacity $c_i$. Considering the minimum cut, we note that only $a_i$ or $b_i$ will be in the cut, and we can maintain this dynamically with a segment tree where for each node, we have a $2 \times 2$ matrix representing where the left endpoint and the right endpoint belongs.

### [NWERC 2022. Faster Than Light](https://www.acmicpc.net/problem/26179)

We notice that for a positive slope line, in order for the line to go through all the rectangles, it must be between the top left corner and the bottom right corner, so we can consider the convex hull of the top left corner and the convex hull of the bottom right corner and check if the two polygons intersect, which can be done in linear time using Minkowski sum. Other cases can be dealt in a similar fashion.

### [NWERC 2022. Last Guess](https://www.acmicpc.net/problem/26179)

Flow with lowerbound. The sum of greens and yellows bound the number of a specific letter, model the flow as a matching between the positions and the letters.

### [SWERC 2013. It Can Be Arranged](https://www.acmicpc.net/problem/9590)

Flow with lowerbound.

### [CodeForces 1924C. Fractal Origami](https://codeforces.com/contest/1924/problem/C)

The formula is pretty evident, simple geometric series, and to implement the solution, we just have to implement $Z_p[\sqrt{2}]$, and this is fine since $2$ is not a quadratic residue in this $p$. 

### [NWERC 2022. Alternating Algorithm](https://www.acmicpc.net/problem/26174)

Note that we can reduce the problem into the case where we only have 0's and 1's by letting the smaller out of the last two elements that were swapped to be denoted as $x$, then, categorize all the elements as $\le x$ or $> x$. After this reduction, note that the answer is lowerbounded by the number of moves for one zero to move into place + the number of zeros after it. Actually, this lowerbound is in fact the answer since if a zero gets blocked by a previous zero for couple operations, then, the value is accounted for by the earlier zeros. With this observation, we can maintain this value using a RURQ data structure, namely, a lazy segment tree, which yields a $O(n\log n)$ solution.

### [NWERC 2022. Kebab Pizza](https://www.acmicpc.net/problem/26184)

A lot of casework. The main idea is to represent the pizza slices as the edges and toppings as vertices, and if there is a vertex with three nonleaves neighbors, it is impossible, otherwise, there are two cases: one connected component is always good, if not, if there is a cycle, it is bad. 

### [BOJ 13727. 5차원 구사과 초콜릿](https://www.acmicpc.net/problem/13727)

Bitmask DP + Berlekamp-Massey. Note that each $2 \times 2 \times 2 \times 2$ layer has to be filled up by itself or the layer that comes after it, so this gives a nice approach to compute the dp $f(l, mask, b)$ which represents $l$th layer, blocks that are on in $mask$ is filled up and we only used subset of blocks $1$, ..., $b$ in this layer. This gives a $O(2^{16}2^5L)$ solution for the first $L$ layers which is not enough, so we need to use Berlekamp-Massey after computing the first $300$ values or so, then, we can find the linear recurrence.  
