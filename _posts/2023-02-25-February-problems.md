---
layout: post
title: February Problem-solving
description: Interesting problems from January
tags: [problem-solving]
usemathjax: true
---

[CSES Counting Tiles](https://cses.fi/problemset/task/2181)

<details markdown="1" style="margin-bottom: 5%">

<summary>Solution</summary>

This technique is called "DP on broken profile". Interesting to note that
problem K from ICPC PACNW Regionals from today can also be solved using this technique
(Thankfully, in the contest, I was able to solve it quite straightforwardly). This problem is easier as we only have to
maintain a bitmask of which tiles are open. This allows a
$O(nm2^n)$ solution. The dp states are $dp[i][j][mask]$, where
$(i, j)$ is the corner, but since $dp[i][j]$ relies solely on
$dp[i][j - 1]$, we can drop the first two dimensions leading
to a $O(2^n)$ memory.

</details>

[CodeForces 662C](https://codeforces.com/contest/662/problem/C)

<details markdown="1" style="margin-bottom: 5%">

<summary>Solution</summary>

Bitmask DP + Finding the linear recurrence. We can first think of
each column as a bitmask of length $n$, labeling them $col\_1$,
$col\_2$, $\dots$, $col\_m$. Then, the rows that are being inversed
could be also represented as a bitmask of length $n$, denoted as
$mask$. Then, we are calculating the $mask$ that minimizes the sum

$$
\sum_{i = 1}^{m} \min(pc(mask \oplus col_i), n - pc(mask \oplus col_i))
$$

where $pc$ is the popcount function. This takes $O(2^n m)$, which is very slow. In order to improve this, we define $dp[k][mask]$ to be the number of $col\_i$ such that $pc(col\_i, mask) = k$. We can easily calculate $dp[0][mask]$ in $O(m)$ as $mask$ has to equal $col\_i$. Suppose $k > 0$, and $pc(col\_i, mask) = k$. We can consider a position $p$, such that $col\_i$ and $mask$ differs in. Then, there would be $dp[k - 1][mask \oplus 2^p]$ possible columns, but it could be possible that $col\_i$ and $mask \oplus 2^p$ differs in position $p$ again, so we have to subtract $dp[k - 2][mask]$, and repeating this process, if $pmask$ denotes $mask \oplus 2^p$, we get

$$
dp[k - 1][pmask] - dp[k - 2][mask] + dp[k - 3][pmask] - \dots
$$

If we sum for all $0 \leq p \leq n - 1$, then we would count each $col\_i$ $k$ times, so $k \cdot dp[k][mask]$. Hence,

$$
dp[k][mask] = \frac{1}{k} \sum_{p = 0}^{n - 1} \sum_{f = 1}^{k} (-1)^{f - 1} dp[k - f][mask \oplus (2^p \cdot (f \bmod 2))]
$$

There are $n \cdot 2^n$ states and $n^2$ per transition, yielding a $O(n^3 \cdot 2^n)$ which is still too slow. Note that

$$
\sum_{p = 0}^{n - 1} \sum_{f = 3}^{k} (-1)^{f - 1} dp[k - f][mask \oplus (2^p \cdot (f \bmod 2))]
= (k - 2)dp[k - 2][mask]
$$

so

$$
dp[k][mask] = \frac{1}{k} \left((k - 2 - n)dp[k - 2][mask] +
\sum_{p = 0}^{n - 1} dp[k - 1][mask \oplus 2^p]\right)
$$

yielding a $O(n)$ transition, hence, a $O(n^2 \cdot 2^n)$ solution.

</details>

[CEOI 2016 Kangaroo](https://oj.uz/problem/view/CEOI16_kangaroo)

<details markdown="1" style="margin-bottom: 5%">

<summary>Solution</summary>

Connected component DP. Note that the problem can be restated as counting the number of permutation $p\_1$, $\dots$, $p\_n$, such that $p\_1 = cs$, $p\_n = cf$, and for all $2 \leq i \leq n - 1$, either $p\_{i - 1} < p\_i > p\_{i + 1}$ or $p\_{i - 1} > p\_i < p\_{i + 1}$ holds. Then, we can proceed with the typical dp states $dp[i][j]$ which represents the number of correct permutations, partially filled with $1$ to $i$, that has $j$ connected components. We note that because we insert the elements in increasing order, we can only either merge two connected components or add an independent component. Obviously, the corner cases are when $i = cs$ or $i = cf$, but they are trivial. Thus, we get a $O(n^2)$ solution with $O(n)$ memory usage.

</details>

[CodeForces 1634F](https://codeforces.com/problemset/problem/1634/F)

<details markdown="1" style="margin-bottom: 5%">

<summary>Solution</summary>

Modified prefix sum. Consider $C_i = A_i - B_i$, and $D_1 = C_1$, $D_2 = C_2 - C_1$, $D_i =
C_i - C_{i - 1} - C_{i - 2}$. Note that $A = B$ if and only if $D_i = 0$ for all $i$.
Also, for each query $[l, r]$, only $D_l \mathrel{+}= 1$, $D_{r + 1} \mathrel{-}= F_{r - l + 2}$, $D_{r + 2} \mathrel{-}= F_{r - l + 1}$.
So we can easily update $D$ by precomputing the Fibonacci numbers. Hence, we get a
$O(N + Q)$ solution.

</details>
