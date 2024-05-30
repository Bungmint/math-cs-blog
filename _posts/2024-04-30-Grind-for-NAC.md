---
layout: post
title: Grind for NAC
description: Final stretch before NAC
tags: [problem-solving]
usemathjax: true
---


### [CodeForces 1817B. Fish Graph](https://codeforces.com/contest/1817/problem/B)

The special node must be a node with degree greater than or equal to $4$, and has a simple cycle passing through it. Finding a simple cycle going through the node can be found by constructing the dfs tree - if there is no backedge going through the special node, there is no simple cycle going through it. Otherwise, we can take the shortest backedge (i.e, backedge connecting to the node with the smallest depth) and its cycle, and any two additional edges connected to the special node will give us the fish graph.

### [CodeForces 1817C. Similar Polynomials](https://codeforces.com/contest/1817/problem/C)

Since $A(x) \equiv B(x - s)$, the leading coefficient of $A$ and $B$ are the same, let $k$ denote it, and $a$, $b$ denote the second coefficient of $A$, $B$, respectively. By simply expanding, we get that $\frac{b - a}{kd} = s$. Thus, we only have to find $k$, $a$, $b$. This can be done by using Lagrange Interpolation + basic Vieta. 

### [CodeForces 1967C. Fenwick Tree](https://codeforces.com/contest/1967/problem/C)

Simple $O(N\log^2 N)$ from observing that length $2^i$ can be decomposed into two $2^{i - 1}$'s + realizing $\sum_{y = 1}^x \binom{y + i - 1}{i} = \binom{x + i}{i + 1}$.

### [CodeForces 1967D. Long Way to be Non-decreasing](https://codeforces.com/contest/1967/problem/D)

Consider the functional graph with edges $i \to b_i$. Since the number of operations follow monotonicity (more operations mean it is easier to get a non-decreasing sequence), so this inspires a binary search solution (so called parametric search in Korean Comp Prog community). For a fixed upperbound on operations, the greedy idea works - take the smallest possible number for the first one, then take the smallest possible number not less than the first one for the second number, etc. Since we know that if a number $\leq x$ cannot be taken for position $i$, for the rest of positions cannot take $\leq x$, so we can simply do a two-pointer, one for the array, the other for $[1, m]$. Checking distance between reachable vertices in a functional graph can be done in $O(1)$, so each iteration of this binary search takes $O(n + m)$ time complexity, overall, $O((n + m)\log m)$. 

### [NAIPC 2019. Monotony](https://www.acmicpc.net/problem/16999)

First, we can get the rows that are monotonic when $mask$ of columns are on in $O(r\cdot 2^c)$. Then, for each pair of rows $(i, j)$, we set a bitmask where the $k$th bit is on if $a_{i, k} > a_{j, k}$, let us refer this bitmask as the color of the edge $(i, j)$. Note that we only need to count monochromatic paths. Now, for each mask in $0$ to $2^c - 1$, we can compute $dp(i, x)$ which denotes the number of subsets of rows in $[1, i]$, ending at $i$ with the last color $x$. This can be done in $O(r^2)$. Thus, the overall complexity is $O(r^2\cdot 2^c)$.

### [BOJ 13705. Ax+Bsin(x)=C](https://www.acmicpc.net/problem/13705)

Key observation is $A \geq B$, so the function $f(x) = Ax + B\sin(x)$ has the derivative 

$$
f'(x) = A + B\cos(x) \geq A - B \geq 0
$$

so it is a non-decreasing function, which allows us to use binary search. The actual implementation requires Python Decimal due to the floating point error.

### [BOJ 31417. 가장 짧은 높이](https://www.acmicpc.net/problem/31417)

Noticing the height of a triangle can be computed using $h = a\sin\theta$, and we want $\theta$ to be minimized, so we only have to care about the closest angles. Thus, for each point, we set the point to be the origin, and we can sort the angle. This yields a $O(N^2\log N)$ solution.

### [BOJ 17978. Washer](https://www.acmicpc.net/problem/17978)

$k = 1$ is trivial. For $k = 2$, we can think of a plane of separation between the two sets (which has to exist since otherwise we can improve it). Thus, we can iterate over all possible triplets, construct the plane, and then iterate over all the points checking if they are above or below the plane. Then, for all 8 possibilities of dividing the three points on the plane we check the value. $O(N^4)$ passes. 

### [SWERC 2019E. Pixels](https://www.acmicpc.net/problem/18297)

The idea is simple - we have $m$ bits to represent the first row, and the final row will give us $m$ equations, so we can use Gaussian elimination to solve the system of linear equations over $\mathbb{Z}_2$. By transposing the matrix, we get a $O(nm\sqrt{nm})$ solution.

### [Open Cup 2017/2018 - GP of Romania. Xormites](https://www.acmicpc.net/problem/19054)

Let $A$ be the xor sum of the entire array. If $A = 0$, it is clearly a draw, otherwise, if the first player scores $x$ points, the second player scores $x \oplus A$, so the only bit that matters is the highest bit of $A$. Hence, we can reduce the problem down to "Given an array of 0's and 1's, the player with odd number of 1's wins." Now, the key observation is that for an even length array, the first player can choose either taking all odd indexed elements or all even indexed elements, and since there are odd number of 1's, one of the set will have odd number of 1's, thus, the first player wins in that case. Otherwise, the first player must take 1 in the first turn for the same argument. Then, note that if the length is of the form $4k + 3$, then, the second player always wins. The moment the first player cannot copy the second player's move, the first player loses, thus, from trial and erroring, I was able to get that the array after the first move should be of the form:

$$
Saabb\ldots cc\overline{S}
$$

where $\overline{S}$ is the reverse of $S$. This can be found in linear time. 

### [RMI 2014 4. min-xor](https://www.acmicpc.net/problem/19239)

The main idea is well-known: $a < b < c$ implies $a \oplus c > \min(a \oplus b, b \oplus c)$. This is obvious from considering the first bit $a$ and $c$ differ in and by pigeonhole principle, $b$ will share the same bit as one of them. Now, maintaining this can be done with two sets, but `multiset` uses more memory than `priority_queue`, so a multiset implementation using `priority_queue` was needed to pass the very annoying memory limit.

### [BOJ 31808. 가우스 법칙](https://www.acmicpc.net/problem/31808)

It is a simple extension to the $O(\log N)$ point in convex polygon check algorithm. For every query point, we check the triangle part it is in, and then iterate over all the neighboring triangles. 

### [Ptz Winter 2015 Day1 A. Binomial Coefficient](https://www.acmicpc.net/problem/19124)

$\binom{n}{k} \pmod{p^e}$ problem. The idea is to compute $t$ and $m \pmod{p^e}$ for $n! = p^tm$ fast, then, rest is simple modulo inverse. Computing $t$ is trivial using Legendre's formula. Computing $m$ requires unsigned Stirling number of the first kind - 

$$
x(x + 1)\ldots(x + n - 1) = \sum_{k = 0}^n \begin{bmatrix} n \\ k \end{bmatrix}x^k
$$

Then, let $(N!)_p$ represent the remainder of the products of numbers coprime to $p$ from $1$ to $N$ in modulo $p^e$. Let $N = up + r$. We get that 

$$
(N!)_p = {\begin{bmatrix} p \\ 1 \end{bmatrix}}^u\prod_{i = 0}^{u - 1}\left(1 + \sum_{k = 1}^{e - 1}\frac{\begin{bmatrix} p \\ k + 1 \end{bmatrix}}{\begin{bmatrix} p \\ 1 \end{bmatrix}}(ip)^k\right)\left(\sum_{k = 0}^r\begin{bmatrix} r + 1 \\ k + 1 \end{bmatrix}(up)^k\right) 
$$

If we let the second term be denoted as $f_{p, e}(u)$, we can show that it is a degree $2e - 2$ polynomial using basic powers series operations. Thus, we can use Lagrange interpolation to compute $f_{p, e}(u)$. Note that we can't simply divide by some factorials when doing Lagrange interpolation since the gcd with $p$ is not $1$, so we have to maintain the $v_p$ constantly. This allows $O(pe + e\log N)$ for each factorial computation which passes very comfortably.

### [Japan Domestic 2020. Luggage](https://www.acmicpc.net/problem/20226)

$T = 300$ with $p < 10^{15}$, the constraints on the problem suggest a $O(p^{\frac{1}{3}})$-ish solution. First, we can use Pollard-Rho and Miller-Rabin algorithm to find all prime factors of $p$ in $O(p^{\frac{1}{4}}\log p)$. Then, we know that the number of divisors are roughly $O(p^{\frac{1}{3}})$, so we iterate over each $d$, and since by AM-GM, we know the sum $w + h$ is minimized when $w = h = \sqrt{\frac{p}{d}}$, so we can binary search and then bruteforce search the closest $w$, $h$, so a roughly $O(p^{\frac{1}{3}}\log p)$ solution, but I am not sure how to really prove the bruteforce part...

### [BOJ 17633/17646](https://www.acmicpc.net/problem/17646)

Lagrange's Four Square theorem + some quadratic residue algorithm (Cornacchia's algorithm). Four squares can be reduced to three squares since it must be of the form $N = 4^a(8k + 7)$, we can subtract by $(2^a)^2$. Three squares can be reduced down to two squares by randomly choosing a number $a$, and checking if $N - a^2$ can be written as a sum of two squares - the density of number that can be written as a sum of two squares is high, so the probabilistic approach works. Finally, for two squares, we use the fact that there cannot be a $p = 4k + 3$ with odd exponent, so we only have to take care of $p = 4k + 1$; we can find the quadratic residue of $x^2 \equiv -1 \pmod{p}$ from the fact that half of $Z_p$ satisfies it, so we can arbitrarily choose $x$ until it works. Then, $p \mid x^2 + 1$, so we can take the gcd of $x + i$ and $p$ which will give a Gaussian integer $a + bi$ with norm $p$, so $a^2 + b^2 = p$. Then, we can combine products of sum of two squares using 

$$
(a^2 + b^2)(c^2 + d^2) = (ac + bd)^2 + (ad - bc)^2
$$

Hence, we are done.

### [KOI 2015 중등부. 금광](https://www.acmicpc.net/problem/10167)

Essentially, for every possible starting $x$ positions, we do a sweepline to the right, maintaining a maximum subarray segment tree. $O(N^2\log N)$ complexity.

### [Open Cup 2017/2018 - GP of Gomel. Kids Aren't Alright](https://www.acmicpc.net/problem/19313)

First, factor using Pollard-rho algorithm. Then, note that there are at most $16$ distinct prime factors of $m$, suggesting a $O(3^k)$ algorithm. Let $D$ be the set of divisors. For each prime, we can think about two sets $S_p\colon\\{S \subseteq D \mid p\mid\gcd(S)\\}$ and $T_p\colon\\{S \subseteq D\mid \operatorname{lcm}(S)\mid m/p\\}$. Then, we can do a PIE using these $2k$ sets, but naively doing so would be $O(4^k)$. Note that having $S_p$ or $T_p$ is essentially the same in terms of calculation, so we can reduce it down to $O(3^k)$. 

### [Open Cup 2021/2022 - GP of Nanjing. Paimon's Tree](https://www.acmicpc.net/problem/31181)

Very cool idea. The trivial dp idea is maintaining the endpoints and then hopefully shift them appropriately, but this is quite hard since when you add an edge with $(u, v)$ endpoints, it is possible to add an edge to $u$ or $v$, but not use it for the path we care. Thus, we can mark a vertex that we will use in our path from our current $(u, v)$. There will be four states - $(u, v)$ connected, one of them disconnected, and both of them disconnected, and we can easily maintain the dp transitions by precomputing the parents and the subtree size of each node with respect to all possible roots. 

### [CodeForces 1975F. Set](https://codeforces.com/contest/1975/my)

The idea boils down to can we reduce the number of constraints as we fill out $S$ from the highest bit to the lowest, and the answer is in fact yes - for bit $2^i$, we can either take $i$, then, the condition $t_1$ and $t_2$ that differ by $2^i$ can be merged as $t_1 \& (t_2 \>\> 1)$, and a similar operation can be done when you don't take the bit.